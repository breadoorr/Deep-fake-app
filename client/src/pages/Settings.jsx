import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export const Settings = () => {
    const navigate = useNavigate();
    const [inputFocus, setInputFocus] = useState(false);
    const [saveButtonHover, setSaveButtonHover] = useState(false);
    const [signOutHover, setSignOutHover] = useState(false);
    const [saveButtonHover, setSaveButtonHover] = useState(false);
    const [signOutHover, setSignOutHover] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#fff";
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#fff";

        return () => {
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        };
    }, []);

    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "background-color 0.3s, color 0.3s",
        maxWidth: "600px",
        margin: "5rem auto 3rem",
        margin: "5rem auto 3rem",
        padding: "2rem",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 255, 128, 0.2)",
    };

    const titleStyle = {
        fontSize: "2rem",
        marginBottom: "1rem",
        color: "#4CAF50",
    };

    const paragraphStyle = {
        fontSize: "1rem",
        color: "#ccc",
        marginBottom: "2rem",
    };

    const labelStyle = {
        display: "block",
        fontSize: "1rem",
        color: "#ccc",
        marginBottom: "0.5rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        border: inputFocus
            ? "2px solid #4CAF50"
            : "1px solid rgba(255, 255, 255, 0.3)",
        border: inputFocus
            ? "2px solid #4CAF50"
            : "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "5px",
        backgroundColor: "#444",
        backgroundColor: "#444",
        color: "#fff",
        outline: "none",
        marginBottom: "1.5rem",
        transition: "box-shadow 0.15s ease, border 0.15s ease",
        boxShadow: inputFocus
            ? "0 0 10px rgba(76, 175, 80, 0.7)"
            : "none",
        transition: "box-shadow 0.15s ease, border 0.15s ease",
        boxShadow: inputFocus
            ? "0 0 10px rgba(76, 175, 80, 0.7)"
            : "none",
    };



    const buttonStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        color: "#fff",
        background: saveButtonHover
        background: saveButtonHover
            ? "linear-gradient(45deg, #32a852, #4CAF50)"
            : "linear-gradient(45deg, #4CAF50, #32a852)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: saveButtonHover
        boxShadow: saveButtonHover
            ? "0 0 15px rgba(76, 175, 80, 0.7)"
            : "none",
        transform: saveButtonHover ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
        marginBottom: "1rem",
    };

    const signOutButtonStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        color: "#fff",
        background: signOutHover
            ? "linear-gradient(45deg, #ff5252, #ff1744)"
            : "linear-gradient(45deg, #ff1744, #ff5252)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: signOutHover
            ? "0 0 15px rgba(255, 87, 87, 0.7)"
            : "none",
        transform: signOutHover ? "scale(1.05)" : "scale(1)",
        transform: saveButtonHover ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
        marginBottom: "1rem",
    };

    const signOutButtonStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        color: "#fff",
        background: signOutHover
            ? "linear-gradient(45deg, #ff5252, #ff1744)"
            : "linear-gradient(45deg, #ff1744, #ff5252)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: signOutHover
            ? "0 0 15px rgba(255, 87, 87, 0.7)"
            : "none",
        transform: signOutHover ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
    };

    const backArrowStyle = {
        position: "fixed",
        top: "3rem",
        left: "1rem",
        color: "#4CAF50",
        fontSize: "2.5rem",
        cursor: "pointer",
        zIndex: 1000,
    };

    const backArrowStyle = {
        position: "fixed",
        top: "3rem",
        left: "1rem",
        color: "#4CAF50",
        fontSize: "2.5rem",
        cursor: "pointer",
        zIndex: 1000,
    };

    return (
        <>
            <Header />
            {/* Back Arrow */}
            <a style={backArrowStyle} className="back-arrow" title="Go Back" onClick={() => navigate('/profile')}>
                <i className="bi bi-arrow-left"></i>
            </a>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Account Settings</h1>
                <p style={paragraphStyle}>Update your username, email, or password below.</p>
                <form id="settings-form">
                    <div>
                        <label htmlFor="username" style={labelStyle}>
                            Change Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter new username"
                            style={inputStyle}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={labelStyle}>
                            Change Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter new email"
                            style={inputStyle}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={labelStyle}>
                            Change Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter new password"
                            style={inputStyle}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={() => setSaveButtonHover(true)}
                        onMouseLeave={() => setSaveButtonHover(false)}
                        onMouseEnter={() => setSaveButtonHover(true)}
                        onMouseLeave={() => setSaveButtonHover(false)}
                    >
                        Save Changes
                    </button>
                </form>
                <button
                    type="button"
                    style={signOutButtonStyle}
                    onMouseEnter={() => setSignOutHover(true)}
                    onMouseLeave={() => setSignOutHover(false)}
                    onClick={() => alert("Signing out...")}
                >
                    Sign Out
                </button>
                <button
                    type="button"
                    style={signOutButtonStyle}
                    onMouseEnter={() => setSignOutHover(true)}
                    onMouseLeave={() => setSignOutHover(false)}
                    onClick={() => alert("Signing out...")}
                >
                    Sign Out
                </button>
            </div>
            <Footer />
        </>
    );
};
