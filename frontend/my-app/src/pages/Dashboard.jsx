import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from './dashboard.module.css';

function Dashboard() {

    const { tenantId } = useParams();

    const [data, setData] = useState({})
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const getDashboard = async () => {
        const url = "http://localhost:3200/api/v1/dashboard/state";
        const dashboardRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'x-tenant-id': tenantId },
        })

        const res = await dashboardRes.json();
        if (res.success) {
            setData(res.stats)
        }
    }

    const authCheck = async () => {
        const url = "http://localhost:3200/api/v1/authCheck";
        const authRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        const res = await authRes.json();
        if (!res.success) {
            return setErr(res.message)
        }
    }

    useEffect(() => {
        getDashboard();
        authCheck();
    }, [])


    return (
        <>
            <div className={styles.dashboardWrapper}>

                {
                    err ? <div className={styles.errorWrapper}>
                        {err && <h3 className={styles.error}>🔒{err}</h3>}
                        {err ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                    </div> :

                        <div className={styles.dashboardContainer}>

                            <div className={styles.statCard}>
                                <h2 className={styles.statTitle}>Total Properties</h2>
                                <div className={styles.statNumber}>
                                    {data.propertiesTotal}
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <h2 className={styles.statTitle}>Total Contacts</h2>
                                <div className={styles.statNumber}>
                                    {data.contactsTotal}
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <h2 className={styles.statTitle}>Total Members</h2>
                                <div className={styles.statNumber}>
                                    {data.membersTotal}
                                </div>
                            </div>

                        </div>
                }

                <div className={styles.dashboardProperty}>
                    <h1>Properties</h1>
                    <ul>
                        <li><span>Available Properties : </span> {data.availableProperties}</li>
                        <li><span>Sold Properties : </span> {data.soldProperties}</li>
                    </ul>
                </div>
            </div>


        </>
    )
}


export default Dashboard;