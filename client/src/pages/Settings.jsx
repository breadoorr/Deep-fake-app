import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";

export const Settings = () => {
    const navigate = useNavigate();
    const { logout } = useUser();

    const containerStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "background-color 0.3s, color 0.3s",
        maxWidth: "600px",
        margin: "6rem auto 4rem",
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

    const signOutButtonStyle = {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1rem",
        color: "#fff",
        background: "linear-gradient(45deg, #ff1744, #ff5252)",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
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

    return (
        <>
            <Header />
            <a style={backArrowStyle} className="back-arrow" title="Go Back" onClick={() => navigate('/profile')}>
                <i className="bi bi-arrow-left"></i>
            </a>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Account Settings</h1>
                <button
                    type="button"
                    style={signOutButtonStyle}
                    onClick={logout}
                >
                    Sign Out
                </button>
            </div>
            <Footer />
        </>
    );
};
