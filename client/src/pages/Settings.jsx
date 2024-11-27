import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export const Settings = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);

    useEffect(() => {
        // Set a unique background color for the body when the component is mounted
        document.body.style.backgroundColor = "#222"; // Unique color for Settings
        document.body.style.color = "#fff"; // Adjust text color if needed

        // Reset the body styles when the component is unmounted
        return () => {
            document.body.style.backgroundColor = ""; // Default color
            document.body.style.color = ""; // Default text color
        };
    }, []);

    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "background-color 0.3s, color 0.3s",
        maxWidth: "600px",
        margin: "4rem auto",
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
        border: inputFocus ? "1px solid #4CAF50" : "none",
        borderRadius: "5px",
        backgroundColor: inputFocus ? "#555" : "#444",
        color: "#fff",
        outline: "none",
        marginBottom: "1.5rem",
        transition: "background-color 0.3s, border 0.3s",
    };

    const buttonStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        color: "#fff",
        background: buttonHover
            ? "linear-gradient(45deg, #32a852, #4CAF50)"
            : "linear-gradient(45deg, #4CAF50, #32a852)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: buttonHover
            ? "0 0 15px rgba(76, 175, 80, 0.7)"
            : "none",
        transform: buttonHover ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
    };

    return (
        <>
            <Header />
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
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};
