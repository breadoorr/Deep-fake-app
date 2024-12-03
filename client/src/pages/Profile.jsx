import Header from "../components/Header";
import Footer from "../components/Footer";


import "./Profile.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();

    const getProfile = () => {

    }


    const containerStyle = {
        padding: '4rem 2rem',
        textAlign: 'center',
        marginTop: '2rem',
        backgroundColor: '#111',
        color: '#fff',
        position: 'relative',
    };

    const settingsIconStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: '#4CAF50',
        fontSize: '2.2rem',
        cursor: 'pointer',
    };

    const backArrowStyle = {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        color: '#4CAF50',
        fontSize: '2rem',
        cursor: 'pointer',
        position: 'relative',
    };

    const settingsIconStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: '#4CAF50',
        fontSize: '2.2rem',
        cursor: 'pointer',
    };

    const backArrowStyle = {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        color: '#4CAF50',
        fontSize: '2rem',
        cursor: 'pointer',
    };

    const headerStyle = {
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const pictureStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        marginBottom: '1rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
        maxWidth: '600px',
        margin: '0 auto',
    };

    const statItemStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 255, 128, 0.2)',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '1.8rem',
        marginBottom: '0.5rem',
    };

    const subHeadingStyle = {
        fontSize: '1.2rem',
        color: '#ccc',
    };

    const playLinkStyle = {
        marginTop: '3rem',
        textAlign: 'center',
    };

    return (
        <>
            <Header />
            <main style={containerStyle}>
                {/* Back Arrow */}
                <a style={backArrowStyle} className="back-arrow" title="Go Back" onClick={() => navigate('/menu')}>
                    <i className="bi bi-arrow-left"></i>
                </a>

                {/* Settings Icon */}
                <a style={settingsIconStyle} className="settings-icon" title="Account Settings" onClick={() => navigate('/settings')}>
                    <i className="bi bi-gear-fill"></i>
                </a>

                <div style={headerStyle}>
                    <img
                        src="../pics/player_1.jpg"
                        alt="Profile"
                        style={pictureStyle}
                    />
                    <h1 style={headingStyle}>Nyan Meow</h1>
                    <p style={subHeadingStyle}>
                        Player Level: <strong>Advanced</strong>
                    </p>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4CAF50' }}>
                        Your Statistics
                    </h2>
                    <div className="stats-grid" style={statsGridStyle}>
                    <div className="stats-grid" style={statsGridStyle}>
                        <div style={statItemStyle}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Total Points</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                1,250
                            </p>
                        </div>
                        <div style={statItemStyle}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Games Played</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                45
                            </p>
                        </div>
                        <div style={statItemStyle} className="accuracy-item">
                        <div style={statItemStyle} className="accuracy-item">
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Accuracy</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                87%
                            </p>
                        </div>
                    </div>
                        </div>
                    </div>

                </div>

                <div style={playLinkStyle}>
                    <a
                        href="Menu.jsx"
                        href="Menu.jsx"
                        className="profile-play-btn"
                    >
                        Play
                    </a>
                </div>
            </main>
            <Footer />
        </>
    );
};
