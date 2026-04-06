import styles from './getContacts.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function GetContacts() {

    const [data, setData] = useState([]);
    const [err, setErr] = useState('')
    const navigate = useNavigate();

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
                    err ?
                        <div className={styles.errorWrapper}>
                            {err && <h3 className={styles.error}>🔒{err}</h3>}
                            {err ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                        </div> : null
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