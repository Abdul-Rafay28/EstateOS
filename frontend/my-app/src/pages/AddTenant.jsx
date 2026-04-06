import { useState } from 'react';
import styles from './addTenant.module.css';
import { useNavigate } from 'react-router';

function AddTenants() {

    const [name, setName] = useState('');
    const [country, setCountry] = useState('')
    const [err, setErr] = useState('')

    const navigate = useNavigate()

    const addWorkspace = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/api/v1/tenants/";
        const workSpaceRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, country })
        })

        const res = await workSpaceRes.json();
        if (res.success) {
            navigate(`/tenant/${res.tenant._id}`);
        } else (
            setErr(res.message)
        )
    }
    return (
        <>
            <div className={styles.addTenantWrapper}>
                <div className={styles.addTenant}>
                    <form onSubmit={addWorkspace}>
                        <h1>Add Workspace</h1>
                        <label>Company Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter company name" />
                        <label>Country Name</label>
                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Enter country name" />
                        {
                            err && <span className={styles.error}>{err}</span>
                        }
                        <button>Create Workspace</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTenants;