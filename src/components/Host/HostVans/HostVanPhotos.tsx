import { useOutletContext } from "react-router-dom";
import { ContextType } from "../../../types/ContextTypes";


export function HostVanPricing(){
    const {hostVan} = useOutletContext<ContextType>();

    return (
        <h1>{hostVan?.price}$/day</h1>
    )
}