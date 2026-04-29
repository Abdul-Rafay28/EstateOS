import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styles from './dashboard.module.css';

function Dashboard() {

    const { tenantId } = useParams();

    const [data, setData] = useState({})
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const location = useLocation();
    const name = location.state?.name;

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
        } else {
            setErr(res)
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
            return setErr(res)
        }
    }

    useEffect(() => {
        getDashboard();
        authCheck();
    }, [])


    return (
        <>


            {
                err ?
                    <div className={styles.errorWrapper}>
                        {err.message && <h3 className={styles.error}>🔒{err.message}</h3>}
                        {
                            err.type === 'Subscription_Required' || err.type === 'Subscription_Expired' ?
                                <button onClick={() => navigate(`/tenant/${tenantId}/subscription/menu`, { state: { name } })} className={styles.btn}>Upgrade Plan</button> :
                                <button className={styles.btn}>Go to login</button>
                        }
                    </div> :
                    <div className={styles.dashboardWrapper}>

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

                        <div className={styles.dashboardProperty}>
                            <h1>Properties</h1>
                            <ul>
                                <li><span>Available Properties : </span> {data.availableProperties}</li>
                                <li><span>Sold Properties : </span> {data.soldProperties}</li>
                            </ul>
                        </div>
                    </div>
            }


        </>
    )
}


export default Dashboard;