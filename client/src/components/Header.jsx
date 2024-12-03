import './Header.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import Login from "../pages/Login";
import { useUser } from '../context/UserContext';

const Header = () => {
    const { userId, logout } = useUser();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
    <header>
        <div id="mobile">
            <i className="bi bi-list" onClick={() => setNavbarOpen(!isNavbarOpen)}></i>
        </div>
        <nav>
            <ul id="navbar" className={isNavbarOpen ? 'active' : ''}>
                <li><Link to="/" onClick={() => setNavbarOpen(false)}>Home</Link></li>
                <li><Link to="/menu" onClick={() => setNavbarOpen(false)}>Menu</Link></li>
                <li><a href="#" onClick={() => setNavbarOpen(false)}>How to Play</a></li>
                { !userId ? (
                <li><a onClick={() => { setLoginOpen(!isLoginOpen); setNavbarOpen(false);}}>Sign Up/Login</a></li>
                ) : (
                    <li>Hi</li>
                )}
            </ul>
        </nav>
    </header>
    <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(!isLoginOpen)} />
        </>
    );
}

export default Header;