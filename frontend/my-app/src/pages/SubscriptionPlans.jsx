import { useNavigate, useParams } from 'react-router';
import styles from './subscriptionPlan.module.css';

function SubscriptionPlan() {

    const {tenantId} = useParams();


    const navigate = useNavigate();

    const handleSelectPlan = (plan) => {
        localStorage.setItem("selectPlan", JSON.stringify(plan))
        navigate(`/tenant/${tenantId}/checkOut/subscription`)
    }
    return (
        <>
            <div className={styles.subscriptionWrapper}>
                <h1>Choose the Right Plan for Your Workspace</h1>
                <p className={styles.subtitle}>
                    Unlock powerful tools to manage your properties, team, and workspace efficiently.
                </p>

                <div className={styles.subscriptionContainer}>

                    <div className={styles.subscriptionCard}>
                        <h2>Basic Plan</h2>
                        <h3>$20 / month</h3>
                        <ul>
                            <li>Up to 50 property listings</li>
                            <li>Basic dashboard access</li>
                            <li>Standard support</li>
                            <li>Limited analytics</li>
                            <li>Single workspace access</li>
                        </ul>
                        <button onClick={() => handleSelectPlan({ name: 'Basic' })}>Start Basic</button>
                    </div>

                    <div className={styles.subscriptionCard}>
                        <span className={styles.popularBadge}>Most Popular</span>
                        <h2>Pro Plan</h2>
                        <h3>$50 / month</h3>
                        <ul>
                            <li>Unlimited property listings</li>
                            <li>Add and manage team members</li>
                            <li>Advanced dashboard & analytics</li>
                            <li>Priority support</li>
                            <li>Multi-user collaboration</li>
                            <li>Contact and lead management</li>
                        </ul>
                        <button onClick={() => handleSelectPlan({ name: 'Pro' })}>Get Started</button>
                    </div>

                    <div className={styles.subscriptionCard}>
                        <h2>Max Plan</h2>
                        <h3>$100 / month</h3>
                        <ul>
                            <li>Everything in Pro</li>
                            <li>Advanced reporting tools</li>
                            <li>Priority performance and speed</li>
                            <li>Early access to new features</li>
                            <li>Dedicated support</li>
                            <li>Unlimited scalability</li>
                        </ul>
                        <button onClick={() => handleSelectPlan({ name: 'Max' })}>Go Premium</button>
                    </div>

                </div>

                <div className={styles.subscriptionFooter}>
                    <p>You can upgrade or downgrade your plan anytime.</p>
                    <p>Secure payments • No hidden charges • Cancel anytime</p>
                </div>
            </div>
        </>
    )
}

export default SubscriptionPlan;