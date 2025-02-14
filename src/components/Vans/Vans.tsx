import { Suspense, useState } from "react"
import '../../css/components/Vans.css'
import { Link, useLoaderData, useSearchParams, Await } from "react-router-dom";
import { Van } from "../../types/Van";
import { getVans } from "../../api/api";

export async function loader() {
    const vansPromise = getVans();
    return { vans: vansPromise };
}

export function Vans() {

    const [searchParams, setSearchParams] = useSearchParams();

    const loaderData = useLoaderData() as { vans: Promise<Van[]> };

    const typeFilter = searchParams.get('type');

    function handleFilterChange(key: string, value: string) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElements(vans: Van[]) {

        const vansToDisplay: Van[] = typeFilter ?
            vans.filter((van: Van) => van.type.toLowerCase() === typeFilter)
            :
            vans;

        const vanElements = vansToDisplay.map((van) => (

            <section key={van.id} className="van-tile">
                <Link to={van.id} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                    <img src={van.imageUrl} />
                    <section className="van-info">
                        <h3>{van.name}</h3>
                        <p>{van.price}<span>/day</span></p>
                    </section>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </section>

        ));

        return <>
            <div className="filters-container">
                <button onClick={() => handleFilterChange("type", "simple")} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
                <button onClick={() => handleFilterChange("type", "rugged")} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>Rugged</button>
                <button onClick={() => handleFilterChange("type", "luxury")} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>Luxury</button>
                {typeFilter ? (<button onClick={() => setSearchParams({})} className="van-type clear-filters">Clear</button>) : null}
            </div>

            <div className="van-list">
                {vanElements}
            </div>
        </>
    }

    return (
        <>
            <div className="van-list-container">
                <h1>Explor our van options</h1>
                <Suspense fallback={<h2>Loading vans ...</h2>}>
                    <Await resolve={loaderData.vans}>
                        {renderVanElements}
                    </Await>
                </Suspense>
            </div>
        </>
    );
}