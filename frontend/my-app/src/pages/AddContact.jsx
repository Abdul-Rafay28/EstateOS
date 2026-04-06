import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from './addContact.module.css';

function AddContact() {

    const { tenantId } = useParams()
    const [err, setErr] = useState('')
    const [mess, setMess] = useState('')
    const [authErr, setAuthErr]=useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    })

    const handleChange = (e) => {
        setErr('')
        setMess('')
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const addContact = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = "http://localhost:3200/api/v1/contacts/addContact";
        const contactRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "x-tenant-id": tenantId,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const res = await contactRes.json();
        if (!res.success) {
            setErr(res.message)
            setLoading(false)
        } else {
            setMess(res.message)
            setLoading(false)
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
            <div className={styles.addContactWrapper}>
                <h1>ADD CONTACT IN YOUR WORKSPACE</h1>

                {
                    authErr ?
                        <div className={styles.errorWrapper}>
                            {authErr && <h3 className={styles.error}>🔒{authErr}</h3>}
                            {authErr ? <button className={styles.goLoginBtn} onClick={() => navigate('/login')}>Go to login</button> : null}
                        </div> :
                        <div className={styles.addContactContaier}>
                            <h2>Add Contact</h2>
                            <form onSubmit={addContact}>

                                <label>Full Name</label>
                                <input type="text" name="fullName" value={formData.name} onChange={handleChange} placeholder="Enter Full Name" />
                                <label>Email Address</label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                                <label>Phone Number</label>
                                <input type="text" name="phone" value={formData.number} onChange={handleChange} placeholder="Enter Phone Number" />
                                {
                                    err && <span className={styles.error}>{err}</span>
                                }
                                {
                                    mess && <span className={styles.message}>{mess}</span>
                                }
                                <button disabled={loading} type="submit">{loading ? "Adding Contact..." : 'Add Contact'}</button>
                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default AddContact;