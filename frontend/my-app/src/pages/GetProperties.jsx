import styles from './getProperties.module.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function GetProperties() {

    const { tenantId } = useParams()
    const [data, setData] = useState([])
    const [err, setErr] = useState(null)
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [search, setSearch] = useState('')

    const location = useLocation();
    const name = location.state?.name;

    useEffect(() => {
        getProperties()
    }, [])

    const getProperties = async () => {
        const url = "http://localhost:3200/api/v1/properties";
        const propertiesRes = await fetch(url, {
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },
        })
        const res = await propertiesRes.json();
        if (res.success) {
            setData(res.propertyData)
        } else {
            setErr(res)
        }
    }

    let filteredData = data;
    if (statusFilter === 'AVAILABLE') {
        filteredData = data.filter((d) => d.status === 'AVAILABLE')
    } else if (statusFilter === 'SOLD') {
        filteredData = data.filter((d) => d.status === 'SOLD')
    }

    const updateProperty = async (id) => {
        const url = "http://localhost:3200/api/v1/propertyStatus/" + id;
        const updateRes = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        })
        const res = await updateRes.json();
        if (!res.success) {
            setErr(res)
        } else {
            getProperties();
        }
    }

    if (search) {
        filteredData = filteredData.filter((d) =>
            d.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
            d.address.toLowerCase().includes(search.toLocaleLowerCase()) ||
            d.listingType.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    function editProperty(id) {
        navigate(`/tenant/${tenantId}/edit/properties/${id}`)
    }

    const deleteProperty = async (id) => {
        const url = "http://localhost:3200/api/v1/property/delete/" + id;
        const deleteRes = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            },

        })
        const res = await deleteRes.json();
        if (!res.success) {
            setErr(res)
        } else {
            getProperties();
        }
    }


    function viewProperty(id) {
        navigate(`/tenant/${tenantId}/viewProperty/${id}`, { state: { name } })
    }

    return (
        <>
            <div className={styles.getPropertiesWrapper}>
                <div className={styles.propertiesBtn}>
                    <button onClick={() => setStatusFilter('ALL')}>All</button>
                    <button onClick={() => setStatusFilter('AVAILABLE')}>Available</button>
                    <button onClick={() => setStatusFilter('SOLD')}>Sold</button>

                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Bar' />
                </div>
                {
                    err ?
                        <div className={styles.errorWrapper}>
                            {err.message && <h3 className={styles.error}>🔒{err.message}</h3>}
                            {err.type === 'Subscription_Required' || err.type === 'Subscription_Expired' ?
                                <button onClick={() => navigate(`/tenant/${tenantId}/subscription/menu`, {state: { name }})} className={styles.btn}>Upgrade Plan</button> :
                                <button className={styles.btn} onClick={() => navigate('/login')}>Go to login</button>}
                        </div> : null
                }
                <div className={styles.getPropertiesContainer}>

                    {
                        filteredData.map((d) => (
                            <div className={styles.getPropertiesCard} key={d._id}>
                                <ul>
                                    <li><span>Title : </span> {d.title}</li>
                                    <li><span>Address : </span> {d.address}</li>
                                    <li><span>ListingType : </span>{d.listingType}</li>
                                    <li><span>Price : </span> {d.price}</li>
                                    <li><span>Owner : </span>{d.ownerContactId?.fullName}</li>
                                    <li><span>Status : </span>{d.status}</li>
                                    <li><span>CreatedBy : </span>{d.createdBy?.name}</li>
                                    {
                                        d.status === 'AVAILABLE' ?
                                            <button className={styles.soldBtn} onClick={() => updateProperty(d._id)}>Mark as Sold</button> : null
                                    }
                                    <button onClick={() => editProperty(d._id)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => deleteProperty(d._id)}>Delete</button>
                                    <button onClick={() => viewProperty(d._id)}>View</button>

                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default GetProperties;