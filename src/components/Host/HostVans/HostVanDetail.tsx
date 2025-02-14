import { Await, Link, LoaderFunctionArgs, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { HostVans } from "../../../types/Van";
import '../../../css/components/HostVanDetail.css'
import { getVan } from "../../../api/api";
import { requireAuth } from "../../../utils/auth";
import { Suspense } from "react";

export async function loader({ params, request }: LoaderFunctionArgs) {
    await requireAuth(request);
    if (!params.id) {
        throw new Error("Id can`t be null"); 
    }
    return { hostVanDetail: getVan(params.id) };
}


export function HostVanDetail() {

    const hostVanPromise = useLoaderData() as { hostVanDetail: Promise<HostVans> };

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

            <Suspense fallback={<h2>Loading van data ...</h2>}>
                <Await resolve={hostVanPromise.hostVanDetail}>
                    {hostVan => (
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
                        )
                    }
                </Await>
            </Suspense>

        </>
    )
}