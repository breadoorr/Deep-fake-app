import { useState } from "react";
import './Login.css';
import axios from "axios";
import { useUser } from '../context/UserContext';

const Login = ({ isOpen, onClose }) => {
    const { login } = useUser();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const clearError = () => setErrorMessage('');

    const toggleMode = () => {
        clearError();
        setIsLoginMode(!isLoginMode);
        setIsForgotPassword(false);
    };

    const toggleForgotPassword = () => {
        clearError();
        setIsForgotPassword(true);
    };

    const backToLogin = () => {
        clearError();
        setIsForgotPassword(false);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', { username, password }, { withCredentials: true });
            const image = response.data.image;
            const blob = new Blob([new Uint8Array(image.data)], { type: 'image/jpg' });
            const url = URL.createObjectURL(blob);
            login(response.data.user.UserID, response.data.user.Username, url);
            console.log('Login successful:', response.data.user.UserID);
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials and try again.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/register', { username, email, password }, { withCredentials: true });
            const image = response.data.image;
            const blob = new Blob([new Uint8Array(image.data)], { type: 'image/jpg' });
            const url = URL.createObjectURL(blob);
            login(response.data.user.id, response.data.user.username, url);
            console.log('Register successful:', response.data);
            onClose();
        } catch (error) {
            console.error('Register failed:', error);
            setErrorMessage('Register failed. Please check your details and try again.');
        }
    };

    const handleForgotPassword = async () => {
        try {
            await axios.post('http://localhost:5000/user/forgot-password', { email });
            alert('Password reset link sent! Check your email.');
            setIsForgotPassword(false);
            clearError(); // Clear error after successful password reset
        } catch (error) {
            console.error('Password reset failed:', error);
            setErrorMessage('Failed to send password reset link. Try again later.');
        }
    };

    return (
        <>
            {isOpen ? (
                <div id="modal" className="modal" data-mode="login">
                    <div className="modal-content">
                        <span className="close-btn" id="close-btn" onClick={onClose}>&times;</span>
                        <h2>
                            {isForgotPassword
                                ? 'Forgot Password'
                                : isLoginMode
                                    ? 'Login'
                                    : 'Register'}
                        </h2>

                        {isForgotPassword ? (
                            <div id="forgot-password-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="modal-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="modal-btn" onClick={handleForgotPassword}>
                                    Reset Password
                                </button>
                                <p className="no-account-text">
                                    Back to <a onClick={backToLogin}>Login</a>
                                </p>
                            </div>
                        ) : isLoginMode ? (
                            <div id="login-form">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="modal-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="modal-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="modal-btn" onClick={handleLogin}>
                                    Login
                                </button>
                                <p className="no-account-text">
                                    Don’t have an account?{' '}
                                    <a onClick={toggleMode}>Sign up here</a>
                                </p>
                                <p className="forgot-password-text">
                                    <a onClick={toggleForgotPassword}>Forgot Password?</a>
                                </p>
                            </div>
                        ) : (
                            <div id="registration-form">
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    className="modal-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="modal-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="modal-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="modal-btn" onClick={handleRegister}>
                                    Register
                                </button>
                                <p className="no-account-text">
                                    Already have an account?{' '}
                                    <a onClick={toggleMode}>Log in here</a>
                                </p>
                            </div>
                        )}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Login;
