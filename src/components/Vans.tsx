import { useEffect, useState } from "react"
import '../css/components/Vans.css'
import { Link } from "react-router-dom";
import { Van } from "../types/Van";



export function Vans() {

    const [vans, setVans] = useState<Van[]>([]);

    useEffect(() => {
        fetch("api/vans")
            .then((res) => res.json())
            .then((data) => setVans(data.vans))
            .catch((err) => console.log("Error fetching vans:", err));
    }, []);

    const vanElements = vans.map(van => (

        <section key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} />
                <section className="van-info">
                    <h3>{van.name}</h3>
                    <p>{van.price}<span>/day</span></p>
                </section>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </section>

    ));

    return (
        <div className="van-list-container">
            <h1>Explor our van options</h1>
            <div className="van-list">
                {vanElements};
            </div>
        </div>);
}