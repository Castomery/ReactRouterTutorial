import { NavLink, Outlet } from "react-router-dom";

export function HostLayout(){

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color:"black"
    }

    return (
        <>
        <header>
            <nav>
                <NavLink to="." end style={({isActive}) => isActive ? activeStyle : undefined}>Dashboard</NavLink>
                <NavLink to="income" style={({isActive}) => isActive ? activeStyle : undefined}>Income</NavLink>
                <NavLink to="vans" style={({isActive}) => isActive ? activeStyle : undefined}>Vans</NavLink>
                <NavLink to="reviews" style={({isActive}) => isActive ? activeStyle : undefined}>Reviews</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
    )
}