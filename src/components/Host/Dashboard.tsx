import { Outlet } from "react-router-dom";


export function Dashboard(){
    return (
        <>
            <h1>Dasgboard here</h1>
            <Outlet/>
        </>
    )
}