import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useState } from "react"

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading]=useState(false);

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = "http://localhost:3200/api/v1/auth/loginUser";
        const loginRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const res = await loginRes.json();
        if (!res.success) {
            setErr(res.message)
            setLoading(false)
            setEmail('')
            setPassword('')
            setErr(res.message)
        } else {
            navigate('/tenants')
        }
    }
    return (
        <>
            <div className={styles.loginWrapper}>
                <div className={styles.loginContainer}>
                    <h1>Login</h1>
                    <form autoComplete='off' onSubmit={login}>
                        <label htmlFor="email">Email</label>
                        <input  autoComplete='off' type="text" onChange={(e) =>{ setEmail(e.target.value); setErr('')}} value={email} placeholder="Enter your email" />
                        <label htmlFor="password">Password</label>
                        <input autoComplete='new-password' type="password" onChange={(e) =>{ setPassword(e.target.value); setErr('')}} value={password} placeholder="Enter your password" />
                        {err && <span  className={styles.error}>{err}</span>}
                        <button disabled={loading} className={styles.loginBtn}>{loading ? "Loggin in..." : "Login"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;