
import type { HostVans } from "../../../types/Van";
import { Await, Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import "../../../css/components/HostVans.css";
import { getHostVans } from "../../../api/api";
import { requireAuth } from "../../../utils/auth";
import { Suspense } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireAuth(request);
    return { hostVans: getHostVans() };
}

export function HostVans() {

    const hostVansPromise = useLoaderData() as { hostVans: Promise<HostVans[]> };

    function renderHostVansElements(hostVans: HostVans[]) {
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
            <>
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
            </>
        )
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <Suspense fallback={<h2>Loading host vans ...</h2>}>
                <Await resolve={hostVansPromise.hostVans}>
                    {renderHostVansElements}
                </Await>
            </Suspense >
        </section>
    )
}