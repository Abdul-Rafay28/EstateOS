import styles from './getMembers.module.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function GetMembers() {

    const { tenantId } = useParams();
    const [data, setData] = useState([])
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const name = location.state?.name;

    useEffect(() => {
        getMembersData();
    }, [])

    const getMembersData = async () => {
        const url = "http://localhost:3200/api/v1/membership/members";
        const getDataRes = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        })

        const res = await getDataRes.json();
        if (res.success) {
            setData(res.memberData)
        } else {
            setErr(res)
        }
    }


    const updateMembers = async (id) => {
        const url = "http://localhost:3200/api/v1/membership/member/status/" + id;
        const updateRes = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'x-tenant-id': tenantId,
            }
        })
        const res = await updateRes.json();
        if (!res.success) {
            alert(res)
        } else {
            getMembersData();
        }
    }

    function editMember(id) {
        navigate(`/tenant/${tenantId}/edit/member/${id}`)
    }

    return (
        <>
            <div className={styles.getMembersWrapper}>
                <h1>WorkSpace Members Data</h1>
                {err ?
                    <div className={styles.errorWrapper}>
                        {err.message && <h3 className={styles.error}>🔒{err.message}</h3>}
                        {err.type === 'Subscription_Required' || err.type === 'Subscription_Expired' ?
                            <button onClick={() => navigate(`/tenant/${tenantId}/subscription/menu`, { state: { name } })} className={styles.btn}>Upgrade Plan</button> :
                            <button className={styles.btn} onClick={() => navigate('/login')}>Go to login</button>}
                    </div> : null}

                <div className={styles.getMembersContainer}>
                    {
                        data.map((d) => (
                            <div key={d._id} className={styles.memberCard}>
                                <ul>
                                    <li><span>Name : </span>{d.userId.name}</li>
                                    <li><span>Email: </span>{d.email}</li>
                                    <li><span>Role : </span>{d.role}</li>
                                    <li><span>Status : </span>{d.status}</li>
                                    <button className={` ${styles.btn} ${d.status === 'disabled' ? styles.active : styles.disabled}`} onClick={() => updateMembers(d._id)}>{d.status === 'active' ? "Disabled" : "Active"}</button>
                                    <button className={styles.editBtn} onClick={() => editMember(d._id)}>Edit</button>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export default GetMembers;