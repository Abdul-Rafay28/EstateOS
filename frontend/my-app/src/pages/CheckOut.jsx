import { useEffect, useState } from 'react';
import styles from './checkOut.module.css';
import { useNavigate, useParams } from 'react-router';

function CheckOut() {


    const [plan, setPlan] = useState(null);
    const [billing, setBilling] = useState('monthly')
    const [email, setEmail] = useState('')
    const [err, setErr] = useState('');
    const [mess, setMess] = useState('')

    const [cardN, setCardN] = useState('')
    const [cardE, setCardE] = useState('')
    const [cardS, setCardS] = useState('')

    const navigate = useNavigate();

    const { tenantId } = useParams();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('selectPlan'));
        setPlan(data)
    }, [])

    const pricing = {
        Basic: 20,
        Pro: 50,
        Max: 100,
    }

    useEffect(() => {
        getEmail();
    }, [])



    const getEmail = async () => {
        const url = "http://localhost:3200/api/v1/auth/auth/me";
        const getRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        const res = await getRes.json();
        if (res.success) {
            setEmail(res.email)
        } else {
            setErr(res.message)
        }
    }

    const monthlyPrice = pricing[plan?.name];

    const yearlyPrice = monthlyPrice * 12;

    const price = billing === 'monthly' ? monthlyPrice : yearlyPrice;

    const handleSubscription = async (e) => {
        e.preventDefault();
        if (!cardN || !cardE || !cardS) {
            return setErr('All fields are required!')
        }
        const url = "http://localhost:3200/api/v1/subscription/upgrade/plan";
        const subscriptionRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ plan: plan?.name.toUpperCase(), billingCycle: billing })
        })
        const res = await subscriptionRes.json();
        if (res.success) {
            setMess(res.message)
        } else {
            setErr(res.message)
        }

    }

    return (
        <>
            <h1>Configure your plan</h1>
            <div className={styles.checkOUtWrapper}>
                <div className={styles.checkOutLeft}>
                    <div>

                        <h2>Plan Details</h2>
                        <div className={styles.checkOutSelect}>
                            <button onClick={() => setBilling('monthly')}>
                                Monthly billing
                                <span>PKR Rs : {monthlyPrice}$</span>

                            </button>

                            <button onClick={() => setBilling('yearly')}>
                                Annual billing
                                <span>PKR Rs : {yearlyPrice}$ </span>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubscription}>
                        <label >Contact Information</label>
                        <input type="text" readOnly value={email} />
                        <h3>Payment Method</h3>
                        <label >Card Number</label>
                        <input type="text" onChange={(e) => { setCardN(e.target.value); setErr('') }} placeholder='Card number' />

                        <div className={styles.checkOUtDateCheck}>
                            <label>Expiration Date</label>
                            <input type="text" onChange={(e) => { setCardE(e.target.value); setErr('') }} placeholder='card expiration date' />
                            <label >Security Code</label>
                            <input type="text" onChange={(e) => { setCardS(e.target.value); setErr('') }} placeholder='card security code' />
                        </div>
                        {
                            err && <span className={styles.error}>{err}</span>
                        }
                        {
                            mess && <span className={styles.messege}>{mess}</span>
                        }
                        <button>Subscrib</button>
                    </form>
                </div>

                <div className={styles.checkOutRight}>
                    <h1>{plan?.name} Plan</h1>
                    <h4><span>Monthly Price : </span>{monthlyPrice}$</h4>
                    <h4><span>Billing Type : </span>{yearlyPrice}$</h4>
                    <h4><span>Total Price : </span>{price}$</h4>

                </div>
            </div>
        </>
    )
}


export default CheckOut;