import Header from "../components/Header";
import Footer from "../components/Footer";
import {useState} from "react";
// import './Profile.css'

export const Profile = () => {

    return (
        <>
            <Header/>

            <main className="profile-container" style={{padding: '4rem 2rem', textAlign: 'center', marginTop: '4rem'}}>
                <section className="profile-header" style={{marginBottom: '2rem'}}>
                    <img src="../pics/player_1.jpg" alt="Profile" className="profile-picture" style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                    }}/>
                    <h1 style={{fontSize: '1.8rem', marginBottom: '0.5rem'}}>Nyan Meow</h1>
                    <p style={{fontSize: '1.2rem', color: '#ccc'}}>Player Level: <strong>Advanced</strong></p>
                </section>

                <section className="profile-stats" style={{margin: '2rem 0'}}>
                    <h2 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#4CAF50'}}>Your Statistics</h2>
                    <div className="stats-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <div className="stat-item" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 255, 128, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Total Points</h3>
                            <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50'}}>1,250</p>
                        </div>
                        <div className="stat-item" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 255, 128, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Games Played</h3>
                            <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50'}}>45</p>
                        </div>
                        <div className="stat-item" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 255, 128, 0.2)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{fontSize: '1.2rem', marginBottom: '0.5rem'}}>Accuracy</h3>
                            <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#4CAF50'}}>87%</p>
                        </div>
                    </div>
                </section>

                <section className="leaderboard-link" style={{marginTop: '5rem'}}>
                    <a href="settings.html" className="leaderboard-btn" style={{
                        display: 'inline-block',
                        padding: '0.8rem 1.5rem',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        color: '#fff',
                        background: 'linear-gradient(45deg, #4CAF50, #32a852)',
                        border: 'none',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}>Edit Account Settings</a>
                </section>

                <section className="play-link" style={{marginTop: '3rem', textAlign: 'center'}}>
                    <a href="menu.html" className="play-btn" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        textTransform: 'uppercase',
                        color: '#fff',
                        background: 'linear-gradient(45deg, #4CAF50, #32a852)',
                        border: 'none',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        // fontFamily: "'Press Start 2P', cursive",
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(0, 255, 128, 0.2)'
                    }}>Play</a>
                </section>
            </main>
            <Footer/>
        </>
    )
}
