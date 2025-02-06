import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import { HostVans } from "../../../types/Van";
import '../../../css/components/HostVanDetail.css'

export function HostVanDetail() {

    const { id } = useParams();
    const [hostVan, setHostVan] = useState<HostVans | null>(null);

    useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setHostVan(data.vans[0]))
            .catch(err => console.log("Error fetching data:", err));
    }, [id])

    const activeStyle ={
        fontWeight: 'bold',
        textDecoration: 'underline',
        color:"black"
    }

    return (
        <>
             <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            
            {hostVan ? (
                <section>
                    <div className="host-van-detail-layout-container">
                        <div className="host-van-detail">
                            <img src={hostVan.imageUrl} />
                            <div className="host-van-detail-info-text">
                                <i
                                    className={`van-type van-type-${hostVan.type}`}
                                >
                                    {hostVan.type}
                                </i>
                                <h3>{hostVan.name}</h3>
                                <h4>${hostVan.price}/day</h4>
                            </div>
                        </div>
                        <nav className="host-van-detail-nav">
                            <NavLink to="." end style={({isActive}) => isActive ? activeStyle : undefined}>Details</NavLink>
                            <NavLink to={`/host/vans/${id}/pricing`} style={({isActive}) => isActive ? activeStyle : undefined}>Pricing</NavLink>
                            <NavLink to={`/host/vans/${id}/photos`} style={({isActive}) => isActive ? activeStyle : undefined}>Photos</NavLink>
                        </nav>
                        <Outlet/>
                    </div>
                </section>

            ) : <h2>Loading...</h2>}

        </>
    )
}