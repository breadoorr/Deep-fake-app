import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUser } from '../context/UserContext';



import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Landing } from "./Landing";
import axios from "axios";
import { useEffect, useState } from "react";

export const Profile = () => {

    const navigate = useNavigate();
    const { userId, username, userImage, logout } = useUser();
    const [totalScore, setTotalScore] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [accuracy, setAccuracy] = useState(0);


    const getProfile = async () => {
        const user = await axios.post('https://deep-fake-app.vercel.app/user/getProfile', {userId}, {withCredentials: true})
        // console.log(user.data.user[0]);  
        setTotalScore(user.data.user[0].TotalScore);
        setGamesPlayed(user.data.user[0].GamesPlayed);
        setQuestions(user.data.user[0].TotalQuestions);
        if (gamesPlayed >= 1) {
            setAccuracy(totalScore / questions);
            
        }
    }

    useEffect(() => {
        getProfile();
    }, []);


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

    return (
         userId ? (
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
                        src={`${userImage}`}
                        alt="Profile"
                        style={pictureStyle}
                    />
                    <h1 style={headingStyle}>{username}</h1>
                </div>

                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4CAF50' }}>
                        Your Statistics
                    </h2>
                    <div className="stats-grid" style={statsGridStyle}>
                        <div style={statItemStyle}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Total Points</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                {totalScore}
                            </p>
                        </div>
                        <div style={statItemStyle}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Games Played</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                {gamesPlayed}
                            </p>
                        </div>
                        <div style={statItemStyle} className="accuracy-item">
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Accuracy</h3>
                            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50' }}>
                                {accuracy}%
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
        ) : (
            <Landing />
        )
    );
};
