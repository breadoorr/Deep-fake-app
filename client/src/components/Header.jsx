import './Header.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import Login from "../pages/Login";
import { useUser } from '../context/UserContext';
import axios from 'axios';

const Header = () => {
    const { userId, username, userImage, logout } = useUser();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getIcon = async () => {
        if (userImage){
            const byteArray = new Uint8Array(userImage); // Ensure it's an array of bytes
            const blob = new Blob([byteArray], { type: 'image/jpg' }); // Create a Blob object with the correct MIME type
            const iconURL = URL.createObjectURL(blob);// Create an object URL for the Blob
            return iconURL;
        } else {
            console.log("no image");
        }
    }

    if (userId && !isLoggedIn) {
        // getIcon();
        console.log(getIcon());
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
                <li><a href="#" onClick={() => setNavbarOpen(false)}>How to Play</a></li>
                { !userId ? (
                <li><a onClick={() => { setLoginOpen(!isLoginOpen); setNavbarOpen(false);}}>Sign Up/Login</a></li>
                ) : (
                    <li>Hi, { username }</li>
                )}
            </ul>
        </nav>
    </header>
    <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(!isLoginOpen)} />
        </>
    );
}

export default Header;