import styles from './getContacts.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function GetContacts() {

    const [data, setData] = useState([]);
    const [err, setErr] = useState('')

    useEffect(() => {
        getContactsData();
    }, [])

    const { tenantId } = useParams()

    const getContactsData = async () => {
        const url = "http://localhost:3200/api/v1/contacts/";
        const getData = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        })
        const res = await getData.json();
        if (res.success) {
            setData(res.contacts)
        } else {
            setErr(res.message)
        }
    }
    return (
        <>
            <div className={styles.getContactWrapper}>
                <h1>Contact Data For Property Owner</h1>
                {
                    err && <h1>{err}</h1>
                }
                <div className={styles.getContactContainer}>

                    {
                        data.map((d) => (
                            <div className={styles.contactCard} key={d._id}>
                                <ul>
                                    <li><span>Name: </span>{d.fullName}</li>
                                    <li><span>Email: </span> {d.email}</li>
                                    <li><span>Phone Number: </span> {d.phone}</li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export default GetContacts;