import styles from './getProperties.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GetProperties() {

    const { tenantId } = useParams()
    const [data, setData] = useState([])
    const [err, setErr] = useState("")

    useEffect(()=>{
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
    return (
        <>
            <div className={styles.getPropertiesWrapper}>
                <div className={styles.getPropertiesContainer}>
                    {
                        err && <h2>{err}</h2>
                    }
                    {
                        data.map((d) => (
                            <div className={styles.getPropertiesCard} key={d._id}>
                                <ul>
                                    <li><span>Title: </span> {d.title}</li>
                                    <li><span>Address: </span> {d.address}</li>
                                    <li><span>ListingType: </span>{d.listingType}</li>
                                    <li><span>Price: </span> {d.price}</li>
                                    <li><span>Owner: </span>{d.ownerContactId?.fullName}</li>
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