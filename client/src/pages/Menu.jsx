import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
    return (
        <>
            <Header />
            <main className="menu-container d-flex">
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4CAF50' }}>
                    Choose Your Play Mode
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '3rem' }}>
                    Select one of the modes below to start playing.
                </p>
                <div
                    className="d-flex flex-wrap justify-content-center gap-4"
                    style={{
                        maxWidth: '1200px',
                    }}
                >
                    {/* Regular Mode */}
                    <div
                        className="menu-card"
                    >
                        <h2
                            style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                color: '#4CAF50',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <i className="bi bi-controller" style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}></i>
                            Regular Mode
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#ddd', marginBottom: '2rem' }}>
                            Play the classic mode with standard rules.
                        </p>
                        <Link to="/game" className="menu-mode-btn">
                            Play
                        </Link>
                    </div>

                    {/* Infinite Mode */}
                    <div
                        className="menu-card">
                        <h2
                            style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                color: '#4CAF50',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <i className="bi bi-infinity" style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}></i>
                            Infinite Mode
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#ddd', marginBottom: '2rem' }}>
                            Endless gameplay. Test your endurance!
                        </p>
                        <button className="menu-mode-btn">Play</button>
                    </div>

                    {/* Timer Mode */}
                    <div
                        className="menu-card">
                        <h2
                            style={{
                                fontSize: '1.5rem',
                                marginBottom: '1rem',
                                color: '#4CAF50',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <i className="bi bi-clock" style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}></i>
                            Time Attack
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#ddd', marginBottom: '2rem' }}>
                            Race against the clock and beat your best time.
                        </p>
                        <button className="menu-mode-btn">Play</button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
