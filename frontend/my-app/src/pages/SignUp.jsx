import { useNavigate } from 'react-router';
import styles from './signUp.module.css';
import { useState } from "react";

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [err, setErr]=useState('')
    const [mess, setMess]=useState('')
    const navigate = useNavigate();

    const handleChange = (e) => {
        setErr('');
        setMess('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signUp = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/api/v1/auth/registerUser";
        const signRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const res = await signRes.json();
        if(!res.success){
            setErr(res.message)
        }else {
            setMess(res.message)
            navigate('/login')
        }
    }

    return (
        <>
            <div className={styles.SignWrapper}>
                <div className={styles.SignContainer}>
                    <h1>Rigerter Now</h1>
                    <form onSubmit={signUp}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create password" />
                        {err && <span className={styles.error}>{err}</span>}
                        {mess && <span className={styles.message}>{mess}</span>}
                        <button className={styles.SignUpBtn}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;