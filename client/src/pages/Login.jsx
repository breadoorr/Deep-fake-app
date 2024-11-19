import {useState} from "react";
import Header from "../components/Header";

const Login = () => {

    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };


    return (
    <div id="modal" className="modal" data-mode="login">
        <div className="modal-content">
            <span className="close-btn" id="close-btn">&times;</span>
            <h2>{isLoginMode ? 'Sign Up / Login' : 'Register'}</h2>
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
            <div id="registration-form" style={{display: null}}>
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
    );

}

export default Login;