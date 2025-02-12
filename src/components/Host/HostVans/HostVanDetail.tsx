import { Link, LoaderFunctionArgs, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { HostVans } from "../../../types/Van";
import '../../../css/components/HostVanDetail.css'
import { getHostVans } from "../../../api/api";
import { requireAuth } from "../../../utils/auth";

export async function loader({ params, request }: LoaderFunctionArgs) {
    await requireAuth(request);
    return getHostVans(params.id);
}


export function HostVanDetail() {

    const hostVan = useLoaderData() as HostVans;
    

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: "black"
    }

    return (
        <>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

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
                        <NavLink to="." end style={({ isActive }) => isActive ? activeStyle : undefined}>Details</NavLink>
                        <NavLink to={`pricing`} style={({ isActive }) => isActive ? activeStyle : undefined}>Pricing</NavLink>
                        <NavLink to={`photos`} style={({ isActive }) => isActive ? activeStyle : undefined}>Photos</NavLink>
                    </nav>
                    <Outlet context={{ hostVan }} />
                </div>
            </section>


        </>
    )
}