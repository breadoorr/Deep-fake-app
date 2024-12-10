import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Rules.css";
import { useNavigate } from "react-router-dom";

export const Rules= () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="how-to-play-container">
                <h1>How to Play</h1>
                <p>Master the game by following these simple steps. Ready to play and become the ultimate champion?</p>

                <div className="steps-container">
                    <div className="step-card">
                        <i className="bi bi-controller"></i>
                        <h3>Step 1: Choose a Mode</h3>
                        <p>Select your preferred game mode to start playing: Learning, Regular, Infinite, or Time Attack.</p>
                    </div>
                    <div className="step-card">
                        <i className="bi bi-lightbulb"></i>
                        <h3>Step 2: Learn the Rules</h3>
                        <p>Each mode has unique rules. Pay attention to the instructions and aim for a high score!</p>
                    </div>
                    <div className="step-card">
                        <i className="bi bi-graph-up"></i>
                        <h3>Step 3: Improve Your Stats</h3>
                        <p>Track your performance, beat your high scores, and aim to climb the leaderboard.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
