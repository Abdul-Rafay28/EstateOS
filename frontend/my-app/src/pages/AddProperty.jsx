import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './addProperty.module.css';

function AddProperty() {

    const [ownerFind, setOwnerFind] = useState([]);
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('')
    const [loading, setLoading] = useState(false)
    const [authErr, setAuthErr] = useState('')
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [filteredOwners, setFilteredOwners] = useState([]);

    const { tenantId } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        price: '',
        listingType: '',
        description: '',
        ownerContactId: '',

    })

    const handleChange = (e) => {
        setErr('')
        setMess('')
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    const addProperty = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const { title, address, price, listingType, description, ownerContactId } = formData;
            if (!title || !address || !price || !listingType || !description || !ownerContactId) {
                setErr("All fields are required!")
                setLoading(false)
                return;
            }

            const url = "http://localhost:3200/api/v1/addProperty";
            const propertyRes = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'x-tenant-id': tenantId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const res = await propertyRes.json();
            if (!res.success) {
                setErr(res.message)
                setLoading(false)
            } else {
                setMess(res.message)
                setLoading(false)
            }

        } catch (err) {
            setErr(err.message)
        }
    }

    useEffect(() => {
        ownerName();
    }, [tenantId])

    const ownerName = async () => {
        const url = "http://localhost:3200/api/v1/contacts/";
        const getRes = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: { "x-tenant-id": tenantId },
        });
        const res = await getRes.json();
        if (res.success) {
            setOwnerFind(res.contacts)
        } else {
            setErr(res.message)
        }
    }


    useEffect(() => {
        authCheck();
    }, [])

    const authCheck = async () => {
        const url = "http://localhost:3200/api/v1/authCheck";
        const authRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        const res = await authRes.json();
        if (!res.success) {
            setAuthErr(res.message)

        } else {
            setMess(res.message)
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = ownerFind.filter((contact) =>
            contact.fullName.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOwners(filtered);
    };

    const selectOwner = (contact) => {
        setFormData({
            ...formData,
            ownerContactId: contact._id,
        });

        setSearch(contact.fullName);
        setFilteredOwners([]);
    };

    return (
        <>
            <div className={styles.addPropertyWrapper}>
                <h1>ADD PROPERTY IN YOUR WORKSPACE</h1>
                {
                    authErr ?
                        <div className={styles.errorWrapper}>
                            {authErr && <h3 className={styles.error}>🔒{authErr}</h3>}
                            {authErr ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                        </div> :
                        <div className={styles.addPropertyContainer}>
                            <h3>Add Property Form</h3>
                            <form onSubmit={addProperty}>
                                <label>Title</label>
                                <input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="e.g., Luxury 3 Bed Apartment in DHA" />

                                <label>Address</label>
                                <input type="text" name="address" onChange={handleChange} value={formData.address} placeholder="e.g., DHA Phase 6, Karachi" />

                                <label>Price</label>
                                <input type="text" name="price" onChange={handleChange} value={formData.price} placeholder="e.g., 250000" />

                                <label>ListingType</label>
                                <select onChange={handleChange} value={formData.listingType} name="listingType">
                                    <option value="" disabled>Select listing type</option>
                                    <option value={"RENT"}>For Rent</option>
                                    <option value={"SALE"}>For Sale</option>
                                </select>

                                <label>Description</label>
                                <textarea onChange={handleChange} value={formData.description} name="description" placeholder="Write a short description (features, nearby places, etc.)" rows={4}></textarea>

                                <label>Owner</label>
                                <input
                                    type="text"
                                    placeholder="Search Owner..."
                                    value={search}
                                    onChange={handleSearch}
                                    className={styles.input}
                                />

                                {
                                    search && filteredOwners.length > 0 && (
                                        <div className={styles.searchDropdown}>
                                            {filteredOwners.map((contact) => (
                                                <div
                                                    key={contact._id}
                                                    className={styles.searchItem}
                                                    onClick={() => selectOwner(contact)}
                                                >
                                                    {contact.fullName} - {contact.phone}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }

                                {
                                    err && <span className={styles.error}>{err}</span>
                                }
                                {
                                    mess && <span className={styles.message}>{mess}</span>
                                }
                                <button disabled={loading} type="submit">{loading ? "Adding..." : "Add Property"}</button>
                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default AddProperty;