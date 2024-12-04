import {useState} from "react";
import './Login.css';
import axios from "axios";
import { useUser } from '../context/UserContext';

const Login = ({ isOpen, onClose}) => {
    const { login } = useUser();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', { username, password }, {withCredentials: true});
            login(response.data.user.UserID, response.data.user.Username, response.data.image)
            console.log(response.data.image)
            console.log('Login successful:', response.data.user.UserID);
            // Handle success (e.g., close modal, navigate, set user data, etc.)
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials and try again.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/user/register', {username, email, password});
            console.log(response.data.image)
            login(response.data.user.id, response.data.user.username, response.data.image);
            console.log('Register successful:', response.data);
            // Handle success (e.g., close modal, navigate, set user data, etc.)
            onClose();
        } catch (error) {
            console.error('Register failed:', error);
            setErrorMessage('Register failed. Please check your credentials and try again.');
        }
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
                <input type="text" placeholder="Username" className="modal-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" className="modal-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="modal-btn" type={'submit'} onClick={handleLogin}>Login</button>
                <p className="no-account-text">
                    Don’t have an account? <a href="#" id="signup-link" onClick={toggleMode}>Sign up here</a>
                </p>
            </div>
                ) : (
            <div id="registration-form">
                <input type="text" placeholder="Enter Username" className="modal-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="Enter Your Email" className="modal-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="modal-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="modal-btn" onClick={handleRegister}>Register</button>
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