import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <>
            <Header />

        <main className="menu-container">
            <h1>Choose Your Play Mode</h1>
            <p>Select one of the modes below to start playing.</p>
            <div className="mode-cards">
                <div className="card" id="regular-mode">
                    <h2><i className="fas fa-gamepad"></i> Regular Mode</h2>
                    <p>Play the classic mode with standard rules.</p>
                    <button className="play-btn" ><Link to={'/game'}>Play</Link></button>
                </div>
                <div className="card" id="infinite-mode">
                    <h2><i className="fas fa-infinity"></i> Infinite Mode</h2>
                    <p>Endless gameplay. Test your endurance!</p>
                    <button className="play-btn">Play</button>
                </div>
                <div className="card" id="timer-mode">
                    <h2><i className="fas fa-clock"></i> Time Attack</h2>
                    <p>Race against the clock and beat your best time.</p>
                    <button className="play-btn">Play</button>
                </div>
            </div>

        </main>
            <Footer />
        </>
    )
}