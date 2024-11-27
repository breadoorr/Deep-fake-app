import './Header.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import Login from "../pages/Login";

const Header = () => {

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
                <li><Link to="/menu" onClick={() => setNavbarOpen(false)}>Home</Link></li>
                <li><a href="#" onClick={() => setNavbarOpen(false)}>How to Play</a></li>
                { !isLoggedIn ? (
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