import './Header.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Login from "../pages/Login";
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const { userId, username, userImage, logout } = useUser();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isNavbarOpen, setNavbarOpen] = useState(false);

 
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
                <li><Link to="/rules" onClick={() => setNavbarOpen(false)}>How to Play</Link></li>
                { !userId ? (
                <li><a onClick={() => { setLoginOpen(!isLoginOpen); setNavbarOpen(false);}}>Sign Up/Login</a></li>
                ) : (
                    <li>
                    <div className="user-info" onClick={() => navigate("/profile")}>
                      <span className="username">{username}</span>
                      <img
                        src={`${userImage}`}
                        alt="icon"
                        className={'user-image'}
                        width={'20px'}
                      />
                    </div>
                  </li>
                )}
            </ul>
        </nav>
    </header>
    <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(!isLoginOpen)} />
        </>
    );
}

export default Header;