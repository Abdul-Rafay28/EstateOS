import styles from './getProperties.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GetProperties() {

    const { tenantId } = useParams()
    const [data, setData] = useState([])
    const [err, setErr] = useState("")
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [search, setSearch] = useState('')

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
            setErr(res.message)
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
            alert(res.message)
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
                            {err && <h3 className={styles.error}>🔒{err}</h3>}
                            {err ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
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

                                    <button onClick={() => updateProperty(d._id)}>Mark as Sold</button> 
                                    <button onClick={() => editProperty(d._id)}>Edit</button>

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