import { useOutletContext } from "react-router-dom";
import { ContextType } from "../../../types/ContextTypes";

export function HostVanInfo(){
    const {hostVan} = useOutletContext<ContextType>();

    return(
        <>
            {hostVan ? <div className="info-container">
                <p><strong>Name:</strong> {hostVan.name}</p>
                <p><strong>Category:</strong> {hostVan.type}</p>
                <p><strong>Description:</strong> {hostVan.description}</p>
                <p><strong>Visibility:</strong> Public</p>
            </div> : <h2>Loading...</h2> }
        </>
    )
}