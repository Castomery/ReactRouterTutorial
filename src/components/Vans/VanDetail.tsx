import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Van } from "../../types/Van";
import "../../css/components/VanDetail.css";


export function VanDetail(){
    const {id} = useParams();
    const [van, setVan] = useState<Van|null>(null);

    useEffect(() => {
        fetch(`/api/vans/${id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans));
    },[id])
    

    return (
        <>
            <div className="van-detail-container">
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