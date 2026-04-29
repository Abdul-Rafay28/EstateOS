import styles from './viewProperty.module.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ViewProperty() {


    const { tenantId, id } = useParams();
    const [property, setProperty] = useState(null)
    const [error, setError] = useState('');
    const [role, setRole] = useState('')

    useEffect(() => {
        getPropertyData();
    }, [])


    const getPropertyData = async () => {
        const url = "http://localhost:3200/api/v1/property/" + id;
        const propertyData = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            },
        })

        const res = await propertyData.json();
        console.log(res)
        if (res.success) {
            setProperty(res.data.property)
            setRole(res.data.createdByRole)
        } else {
            setError(res.message)
        }

    }
    return (
        <>
            {
                property ?
                    <div className={styles.ViewPropertyWrapper}>
                        <h1> Property Overview</h1>

                        <div className={styles.ViewProperty}>
                            <ul>
                                <h2>Property Information</h2>
                                <li><span>Title : </span>{property.title}</li>
                                <li><span>Address : </span> {property.address}</li>
                                <li><span>Price : </span>{property.price}</li>
                                <li><span>Listing Type : </span>{property.listingType}</li>
                                <li><span>Description : </span>{property.description}</li>
                            </ul>

                        </div>
                        <div className={styles.ViewPropertyContainer}>

                            
                            <div className={styles.ViewPropertyCard}>
                                <h2>Owner Information</h2>
                                <ul>
                                    <li><span>Name : </span>{property.ownerContactId?.fullName}</li>
                                    <li><span>Email : </span>{property.ownerContactId?.email}</li>
                                    <li><span>Phone Number : </span>{property.ownerContactId?.phone}</li>
                                </ul>
                            </div>

                            <div className={styles.ViewPropertyCard}>
                                <h2>Created By</h2>
                                <ul>
                                    <li><span>Name : </span>{property.createdBy?.name}</li>
                                    <li><span>Email : </span>{property.createdBy?.email}</li>
                                    <li><span>Role : </span>{role}</li>
                                </ul>
                            </div>
                        </div>

                    </div > : <h1>Loading...</h1>
            }
        </>
    )
}

export default ViewProperty;