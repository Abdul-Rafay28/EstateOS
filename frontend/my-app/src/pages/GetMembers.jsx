import styles from './getMembers.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GetMembers() {

    const { tenantId } = useParams();
    const [data, setData] = useState([])
    const [err, setErr] = useState('');

    useEffect(() => {
        getMembersData();
    }, [])

    const getMembersData = async () => {
        const url = "http://localhost:3200/api/v1/membership/members";
        const getDataRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        })
        const res = await getDataRes.json();
        if (res.success) {
            setData(res.memberData)
        } else {
            setErr(res.message)
        }
    }

    return (
        <>
            <div className={styles.getMembersWrapper}>
                {
                    err && <h2>{err}</h2>
                }
                <h1>WorkSpace Members Data</h1>
                <div className={styles.getMembersContainer}>
                    {
                        data.map((d) => (
                            <div key={d._id} className={styles.memberCard}>
                                <ul>
                                    <li>{d.userId.name}</li>
                                    <li>{d.email}</li>
                                    <li>{d.role}</li>
                                    <li>{d.status}</li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export default GetMembers;