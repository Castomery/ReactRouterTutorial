import { Await, Link, LoaderFunctionArgs, useLoaderData, useLocation } from "react-router-dom"
import { Van } from "../../types/Van";
import "../../css/components/VanDetail.css";
import { getVan } from "../../api/api";
import { Suspense } from "react";

export function loader({ params }: LoaderFunctionArgs) {
    if (!params.id) {
        throw new Error("Id can`t be null"); 
    }
    return { van: getVan(params.id) };
}


export function VanDetail() {

    const vanPromise = useLoaderData() as { van: Promise<Van> };
    const location = useLocation();

    const search = location.state?.search || '';
    const type = location.state?.type || 'all';


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

                <Suspense fallback={<h2>Loading van data ...</h2>}>
                    <Await resolve={vanPromise.van}>
                        {van => (
                            <div className="van-detail">
                                <img src={van.imageUrl} />
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price">{van.price}<span>/day</span></p>
                                <p>{van.description}</p>
                                <button className="link-button">Rent this van</button>
                            </div>
                        )
                        }

                    </Await>
                </Suspense>

            </div>
        </>
    )

}