
import type { HostVans } from "../../../types/Van";
import { Link, useLoaderData } from "react-router-dom";
import "../../../css/components/HostVans.css";
import { getHostVans } from "../../../api/api";
import { requireAuth } from "../../../utils/auth";

export async function loader(){
    await requireAuth();
    return getHostVans();
}

export function HostVans() {

    const hostVans = useLoaderData() as HostVans[];

    const vanElements = hostVans.map(hostVan => (

        <Link
            to={hostVan.id}
            key={hostVan.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={hostVan.id}>
                <img src={hostVan.imageUrl} alt={`Photo of ${hostVan.name}`} />
                <div className="host-van-info">
                    <h3>{hostVan.name}</h3>
                    <p>${hostVan.price}/day</p>
                </div>
            </div>
        </Link>

    ));

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    hostVans.length > 0 ? (
                        <section>
                            {vanElements}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}