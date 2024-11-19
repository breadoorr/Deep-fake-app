import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
    <header>
        <div id="mobile">
            <i id="bar" className="fas fa-bars"></i>
        </div>
        <nav>
            <ul id="navbar">
                <li><Link to="/">Home</Link></li>
                <li><a href="#">How to Play</a></li>
                <li><a href="#">Team</a></li>
                <li><Link to="/login">Sign Up/Login</Link></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;