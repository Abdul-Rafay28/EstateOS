import { useNavigate } from 'react-router';
import styles from './getTenants.module.css';

import { useEffect, useState } from "react";

function GetTenants() {


    const [data, setData] = useState([]);
    const [err, setErr] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        getTenants();
    }, [])

    const getTenants = async () => {
        try {
            const url = "http://localhost:3200/api/v1/tenants/getTenants";
            const tenantsRes = await fetch(url, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await tenantsRes.json();
            if (res.success) {
                setData(res.tenantData)
            } else {
                setErr(res.message)
            }
        } catch (err) {
            setErr(err.message)
        }
    }

    return (
        <>
            <div className={styles.getTenantsWrapper}>
                <h1>Select Workspace</h1>
                <h5>Choose a tenant to continue</h5>
                <span className={styles.workspaceBtn}><button onClick={() => navigate('/addTenantWorkspace')}>Create WorkSpace</button></span>
                {
                    err ?
                        <div className={styles.errorWrapper}>
                            {err && <h3 className={styles.error}>🔒{err}</h3>}
                            {err ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                        </div> : null
                }
                <div className={styles.getTenantsContainer}>
                    {
                        data.map((d) => (
                            <div onClick={() => navigate(`/tenant/${d._id}`, {
                                state: { name: d.name }
                            })} className={styles.getTenantsSection} key={d._id}>
                                <h3><span>Tenant Name:</span>{d.name}</h3>
                                <h3><span>Country:  </span> {d.country}</h3>
                                <h3><span>Status: </span>{d.status}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default GetTenants;