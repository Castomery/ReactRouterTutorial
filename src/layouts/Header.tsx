import { Link, NavLink } from "react-router-dom";
import '../css/layouts/Header.css';

export function Header(){

    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color:"black"
    }

    return (
        <header>
            <Link className="site-logo" to='/'>#VANLIFE</Link>
            <nav>
                <NavLink to='/host' style={({isActive}) => isActive ? activeStyle : undefined}>Host</NavLink>
                <NavLink to='/about' style={({isActive}) => isActive ? activeStyle : undefined}>About</NavLink>
                <NavLink to='/vans' style={({isActive}) => isActive ? activeStyle : undefined}>Vans</NavLink>
            </nav>
        </header>
    )
}