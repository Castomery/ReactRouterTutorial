import { useState } from "react"
import '../../css/components/Vans.css'
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Van } from "../../types/Van";
import { getVans } from "../../api/api"; 

export function loader(){
    return getVans();
}

export function Vans() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [error, setError] = useState<any>(null);
    
    const vans = useLoaderData() as Van[];

    const typeFilter = searchParams.get('type');

    const vansToDisplay: Van[] = typeFilter ?
        vans.filter(van => van.type.toLowerCase() === typeFilter)
        :
        vans;

    const vanElements = vansToDisplay.map((van) => (

        <section key={van.id} className="van-tile">
            <Link to={van.id} state={{search: `?${searchParams.toString()}`, type: typeFilter}}>
                <img src={van.imageUrl} />
                <section className="van-info">
                    <h3>{van.name}</h3>
                    <p>{van.price}<span>/day</span></p>
                </section>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </section>

    ));

    if(error){
        return <h1>There wan an error: {error.message}</h1>
    }

    return (
        <>
            <div className="filters-container">
                <button onClick={() => setSearchParams({type: 'simple'})} className={`van-type simple ${typeFilter === "simple"? "selected": ""}`}>Simple</button>
                <button onClick={() => setSearchParams({type: 'rugged'})} className={`van-type rugged ${typeFilter === "rugged"? "selected": ""}`}>Rugged</button>
                <button onClick={() => setSearchParams({type: 'luxury'})} className={`van-type luxury ${typeFilter === "luxury"? "selected": ""}`}>Luxury</button>
                {typeFilter ? (<button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear</button>): null}
            </div>

            <div className="van-list-container">
                <h1>Explor our van options</h1>
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </>
    );
}