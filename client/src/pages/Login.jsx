import {useState} from "react";
import Header from "../components/Header";
import './Login.css';

const Login = ({ isOpen, onClose}) => {

    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };


    return (
        <>
            { isOpen ? (
    <div id="modal" className="modal" data-mode="login">
        <div className="modal-content">
            <span className="close-btn" id="close-btn" onClick={onClose}>&times;</span>
            <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
            {isLoginMode ? (
            <div id="login-form">
                <input type="text" placeholder="Username" className="modal-input"/>
                <input type="password" placeholder="Password" className="modal-input"/>
                <button className="modal-btn">Login</button>
                <p className="no-account-text">
                    Don’t have an account? <a href="#" id="signup-link" onClick={toggleMode}>Sign up here</a>
                </p>
            </div>
                ) : (
            <div id="registration-form">
                <input type="text" placeholder="Enter Username" className="modal-input"/>
                <input type="email" placeholder="Enter Your Email" className="modal-input"/>
                <input type="password" placeholder="Password" className="modal-input"/>
                <button className="modal-btn">Register</button>
                <p className="no-account-text">
                    Already have an account? <a href="#" id="login-back-link" onClick={toggleMode}>Log in here</a>
                </p>
            </div>
            )}
        </div>
    </div>
                ): null }
        </>
    );

}

export default Login;