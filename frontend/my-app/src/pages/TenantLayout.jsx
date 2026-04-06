import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from './tenantLayout.module.css';
import { useLocation } from 'react-router';

function TenantLayout() {

    const { tenantId } = useParams();
    const location = useLocation();
    const name = location.state?.name;
    const navigate = useNavigate();


    const logoutBtn = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/api/v1/tenants/logout";
        const logRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
        const res = await logRes.json();
        if (res.success) {
            alert(res.message)
            navigate('/login')
        } else {
            alert(res.message)
        }
    }
    return (
        <>
            <div className={styles.tenantWrapper}>
                <div className={styles.tenantContainer}>
                    <div className={styles.tenantHeading}>
                        <h2>{name} Workspace </h2>
                        <div className={styles.logoutBtn}>
                            <button onClick={logoutBtn}>Logout</button>
                        </div>
                    </div>

                    <div className={styles.tenantLeftMenu}>
                        <h2>Workspace Menu</h2>
                        <div className={styles.tenantLinks}>
                            <h3>Dashboard</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/dashboard/stats`} state={{name}}>View Dashboard</Link></li>
                            </ul>
                        </div>

                        <div className={styles.tenantLinks}>
                            <h3>Properties</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/properties`} state={{ name }}>View Properties</Link></li>
                                <li><Link to={`/tenant/${tenantId}/properties/new`} state={{name}} >Add Property</Link> </li>
                            </ul>
                        </div>

                        <div className={styles.tenantLinks}>
                            <h3>Contacts</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/contacts`} state={{name}}>View Contact</Link></li>
                                <li><Link to={`/tenant/${tenantId}/contacts/new`} state={{name}}>Add Contact</Link></li>
                            </ul>
                        </div>

                        <div className={styles.tenantLinks}>
                            <h3>Members</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/members`} state={{name}}>View Member</Link></li>
                                <li><Link to={`/tenant/${tenantId}/members/new`} state={{name}}>Add Member</Link></li>
                            </ul>
                        </div>

                    </div>

                    <div>
                        <Outlet />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TenantLayout;