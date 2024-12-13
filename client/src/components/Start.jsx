import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Start.css";

export const Start = ( {mode, onButtonClick}) => {
    const navigate = useNavigate();
    console.log(mode);

    return (
        <>
            <Header />
            <div className="start-page">
                    { mode === 'regular' && (
                        <div className="start-header">
                            <h1>Welcome to Basic Mode </h1>
                            <p style={{lineHeight:"1.7rem"}}>Get ready to explore and test your knowledge!</p>
                        </div>
                    )}
                    { mode === 'infinite' && (
                        <div className="start-header">
                            <h1>Welcome to Infinite Mode</h1>
                            <p style={{lineHeight:"1.7rem"}}>Endless gameplay awaits! Test your endurance.</p>
                        </div>
                    )}

                    { mode === 'timer' && (
                        <div className="start-header">
                            <h1>Welcome to Time Attack Mode</h1>
                            <p style={{lineHeight:"1.7rem"}}>Race against the clock and beat your best time.</p>
                        </div>
                    )}

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
