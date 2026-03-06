import { Link, Outlet, useParams } from 'react-router-dom';
import styles from './tenantLayout.module.css';

function TenantLayout() {

    const { tenantId } = useParams();
    return (
        <>
            <div className={styles.tenantWrapper}>
                <div className={styles.tenantContainer}>
                    <div className={styles.tenantHeading}>
                        <h2>XYZ Estate Workspace </h2>

                    </div>

                    <div className={styles.tenantLeftMenu}>
                        <h2>Workspace Menu</h2>
                        <div className={styles.tenantLinks}>
                            <h3>Properties</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/properties`}>View Properties</Link></li>
                                <li><Link to={`/tenant/${tenantId}/properties/new`} >Add Property</Link> </li>
                            </ul>
                        </div>

                        <div className={styles.tenantLinks}>
                            <h3>Contacts</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/contacts`}>View Contact</Link></li>
                                <li><Link to={`/tenant/${tenantId}/contacts/new`}>Add Contact</Link></li>
                            </ul>
                        </div>

                        <div className={styles.tenantLinks}>
                            <h3>Members</h3>
                            <ul>
                                <li><Link to={`/tenant/${tenantId}/members`}>View Member</Link></li>
                                <li><Link to={`/tenant/${tenantId}/members/new`}>Add Member</Link></li>
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