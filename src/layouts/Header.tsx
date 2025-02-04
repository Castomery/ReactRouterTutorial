import { Link } from "react-router-dom";
import '../css/layouts/Header.css';

export function Header(){

    return (
        <header>
            <Link className="site-logo" to='/'>#VANLIFE</Link>
            <nav>
                <Link to='/about'>About</Link>
                <Link to='/vans'>Vans</Link>
            </nav>
        </header>
    )
}