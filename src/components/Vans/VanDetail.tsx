import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import { Van } from "../../types/Van";
import "../../css/components/VanDetail.css";


export function VanDetail(){
    const {id} = useParams();
    const [van, setVan] = useState<Van|null>(null);
    const location = useLocation();

    useEffect(() => {
        fetch(`/api/vans/${id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans));
    },[id])

    const search = location.state?.search || '';
    const type =  location.state?.type || 'all';
    

    return (
        <>
            <div className="van-detail-container">
                <Link
                                to={`..${search}`}
                                relative="path"
                                className="back-button"
                            >&larr; 
                            <span>Back to {type} vans</span>
                </Link>

                {van ? (
                    <div className="van-detail">
                        <img src={van.imageUrl}/>
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                        <h2>{van.name}</h2>
                        <p className="van-price">{van.price}<span>/day</span></p>
                        <p>{van.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                ):<h2>Loading...</h2>}
            </div>
        </>
    )

}