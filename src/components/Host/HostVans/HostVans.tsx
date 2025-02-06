import { useEffect, useState } from "react";
import type { HostVans } from "../../../types/Van";
import { Link } from "react-router-dom";
import "../../../css/components/HostVans.css";

export function HostVans() {

    const [hostVans, setHostVans] = useState<HostVans[]>([]);

    useEffect(() => {
        fetch("/api/host/vans")
            .then((res) => res.json())
            .then((data) => setHostVans(data.vans))
            .catch((err) => console.log("Error fetching vans:", err));
    }, []);

    const vanElements = hostVans.map(hostVan => (

        <Link
            to={`/host/vans/${hostVan.id}`}
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