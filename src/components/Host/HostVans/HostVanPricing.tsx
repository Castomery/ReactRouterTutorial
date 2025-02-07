import { useOutletContext } from "react-router-dom";
import { ContextType } from "../../../types/ContextTypes";


export function HostVanPhotos(){
    const {hostVan} = useOutletContext<ContextType>();
    
        return (
            <img src={hostVan?.imageUrl} className="host-van-detail-image"/>
        )
}