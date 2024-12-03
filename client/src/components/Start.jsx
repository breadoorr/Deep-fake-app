import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./Start.css";

export const Start = ( {onButtonClick} ) => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="start-page">
                <div className="start-header">
                    <h1>Welcome to Basic Mode</h1>
                    <p>Get ready to explore and test your knowledge!</p>
                    {/*
                    //
                    // if (mode === "learning") {
                    //     <h1>Welcome to Learning Mode</h1>
                    //     <p>Learn how to distinguish deepfakes from real media.</p>
                    // }
                    // if (mode === "infinite") {
                    //     <h1>Welcome to Infinite Mode</h1>
                    //     <p>Endless gameplay awaits! Test your endurance.</p>
                    // }
                    // if (mode === "timer") {
                    //     <h1>Welcome to Time Attack Mode</h1>
                    //     <p>Race against the clock and beat your best time.</p>
                    // }
                    */}
                </div>

                <div className="start-buttons">
                    <button className="start-btn start-play" onClick={onButtonClick}>
                        Start Game
                    </button>
                    <button className="start-btn start-back" onClick={() => navigate("/menu")}>
                        Back to Menu
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

// module.exports.default = {Start};

