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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [iconURL, setIconUrl] = useState(null);

    const getIcon = () => {
        if (userImage){
            // console.log(typeof(userImage))
            const byteArray = new Uint8Array(userImage.data); // Ensure it's an array of bytes
            const blob = new Blob([byteArray], { type: 'image/jpg' }); // Create a Blob object with the correct MIME type
            const iconURL = URL.createObjectURL(blob);// Create an object URL for the Blob
            return iconURL;
        } else {
            console.log("no image");
        }
    }

    if (userId && !isLoggedIn) {
        setIconUrl(getIcon());
        // consolelog(getIcon());
        setIsLoggedIn(true);
    }

 
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
                    // <li>Hi, { username }</li>
                    <img src={`${iconURL}`} alt="icon" width={'50px'} onClick={() => navigate('/profile')}/>
                )}
            </ul>
        </nav>
    </header>
    <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(!isLoginOpen)} />
        </>
    );
}

export default Header;