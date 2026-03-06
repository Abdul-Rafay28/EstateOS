import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './addProperty.module.css';

function AddProperty() {

    const [ownerFind, setOwnerFind] = useState([]);
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('')
    const [loading, setLoading] = useState(false)

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

    return (
        <>
            <div className={styles.addPropertyWrapper}>
                <h1>ADD PROPERTY IN YOUR WORKSPACE</h1>
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
                        <select onChange={handleChange} value={formData.ownerContactId} name="ownerContactId">
                            <option value="" disabled >Select Owner</option>
                            {
                                ownerFind.map((contact) => (
                                    <option key={contact._id} value={contact._id}>{contact.fullName}</option>
                                ))
                            }
                        </select>

                        {
                            err && <span className={styles.error}>{err}</span>
                        }
                        {
                            mess && <span className={styles.message}>{mess}</span>
                        }
                        <button disabled={loading} type="submit">{loading ? "Adding..." : "Add Property"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProperty;