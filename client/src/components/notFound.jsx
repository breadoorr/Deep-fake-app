
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const containerStyle = {
        textAlign: "center",
        marginTop: "10%",
        color: "#4CAF50",
        fontFamily: "Arial, sans-serif",
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
        transition: "all 0.3s ease",
    };

    return (
        <div style={containerStyle}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button
                style={buttonStyle}
                onClick={() => navigate("/")}
            >
                Go Home
            </button>
        </div>
    );
};

export default NotFound;
