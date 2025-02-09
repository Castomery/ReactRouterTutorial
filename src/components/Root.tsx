import { Outlet } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import '../css/components/Root.css';

export function Root() {
    return (
        <>
            <div className="site-wrapper">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}