import { Outlet } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export function Root(){
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}