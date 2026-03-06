import { useState } from 'react';
import styles from './addMember.module.css';
import { useParams } from 'react-router-dom';

function AddMember() {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('')

    const { tenantId } = useParams()

    const addMember = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/api/v1/membership/add-member";
        const memberRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, role })
        })
        const res = await memberRes.json();
        if (!res.success) {
            setErr(res.message)
        } else {
            setMess(res.message)
        }
    }
    return (
        <>
            <div className={styles.addMemberWrapper}>
                <h1>ADD MEMBER IN YOUR WORKSPACE</h1>
                <div className={styles.addMemberContainer}>
                    <h2>Add Member</h2>
                    <form onSubmit={addMember}>
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => {setEmail(e.target.value); setErr(''); setMess('')}} placeholder="Enter Member Email" />
                        <label>Role</label>

                        <select value={role} onChange={(e) => {setRole(e.target.value); setErr(''); setMess('')}}>
                            <option value="" disabled>Select Member Role</option>

                            <option value="OWNER">OWNER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="AGENT">AGENT</option>
                            <option value="VIEWER">VIEWER</option>
                        </select>

                        {
                            err && <span className={styles.error}>{err}</span>
                        }
                        {
                            mess && <span className={styles.message}>{mess}</span>
                        }
                        <button type='submit'>Add Member</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMember;