import { useEffect, useState } from 'react';
import styles from './addMember.module.css';
import { useNavigate, useParams } from 'react-router-dom';

function AddMember() {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('')
    const [authErr, setAuthErr] = useState('')
    const navigate = useNavigate();

    const { tenantId, id } = useParams()

    useEffect(() => {
        getMemberData();
    }, [])

    const getMemberData = async () => {
        const url = "http://localhost:3200/api/v1/membership/member/data/" + id;
        const getMemeberRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        });
        const res = await getMemeberRes.json();
        if (res.success) {
            setEmail(res.data.email)
            setRole(res.data.role)
        } else {
            alert(res.data.message)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            //Update Member
            const url = "http://localhost:3200/api/v1/membership/member/update/" + id;
            const updateMember = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'x-tenant-id': tenantId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role })
            })
            const res = await updateMember.json();
            if (!res.success) {
                setErr(res.message)
            } else {
                setMess(res.message)
                navigate(`/tenant/${tenantId}/members`)
            }


        } else {
            //Add Member

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

    }
    useEffect(() => {
        authCheck();
    }, [])


    const authCheck = async () => {
        const url = "http://localhost:3200/api/v1/authCheck";
        const authRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
        const res = await authRes.json();
        if (!res.success) {
            setAuthErr(res.message)

        } else {
            setMess(res.message)
        }
    }
    
    return (
        <>
            <div className={styles.addMemberWrapper}>
                <h1>ADD MEMBER IN YOUR WORKSPACE</h1>

                {
                    authErr ?
                        <div className={styles.errorWrapper}>
                            {authErr && <h3 className={styles.error}>🔒{authErr}</h3>}
                            {authErr ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                        </div> :
                        <div className={styles.addMemberContainer}>
                            <h2>Add Member</h2>

                            <form onSubmit={handleSubmit}>
                                <label>Email</label>
                                <input type="text" value={email} readOnly={!!id} onChange={(e) => { setEmail(e.target.value); setErr(''); setMess('') }} placeholder="Enter Member Email" />
                                <label>Role</label>

                                <select value={role} onChange={(e) => { setRole(e.target.value); setErr(''); setMess('') }}>
                                    <option value="" disabled>Select Member Role</option>
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

                                <button type='submit'>{id ? "Update Member" : "Add Member"}</button>

                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default AddMember;