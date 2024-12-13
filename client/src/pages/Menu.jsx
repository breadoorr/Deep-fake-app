import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./menu.css";
// import {Navigation} from "../components/Navigation";

export const Menu = () => {
    const navigate = useNavigate();

    
    return (
        <>
            <Header/>
            {/* <Navigation /> */}


                {/* Main Content */}
                <main className="menu-container d-flex w-screen">

                    <h1 className={"play-mode-menu"}>
                        Choose Your Play Mode
                    </h1>
                    <p style={{fontSize: '1.1rem', color: '#ccc', marginBottom: '3rem',  lineHeight:"1.5rem"}}>
                        Select one of the modes below to start playing.
                    </p>
                    <div
                        className="d-flex flex-wrap justify-content-center gap-4"
                        style={{
                            maxWidth: '80%'
                        }}
                    >
                        <div className="menu-card h-auto p-2" onClick={() => navigate('/learning')}>
                            <h2 className="menu-h2">
                                <i className="bi bi-book" style={{marginRight: '0.5rem', fontSize: '1.8rem'}}></i>
                                Learning Mode
                            </h2>
                            <p style={{fontSize: '1rem', color: '#ddd', marginBottom: '2rem', lineHeight:"1.5rem"}}>
                                Learn to distinguish Real and Fake.
                            </p>
                            {/*<Link to="/learning" className="menu-mode-btn">*/}
                            {/*    Play*/}
                            {/*</Link>*/}
                        </div>
                        {/* Regular Mode */}
                        <div className="menu-card" onClick={() => navigate('/game')}>
                            <h2 className="menu-h2">
                                <i className="bi bi-controller" style={{marginRight: '0.5rem', fontSize: '1.8rem'}}></i>
                                Basic Mode
                            </h2>
                            <p style={{fontSize: '1rem', color: '#ddd', marginBottom: '2rem', lineHeight:"1.5rem"}}>
                                Play the classic mode with standard rules.
                            </p>
                            {/*<Link to="/game" className="menu-mode-btn">*/}
                            {/*    Play*/}
                            {/*</Link>*/}
                        </div>

                        {/* Infinite Mode */}
                        <div className="menu-card" onClick={() => navigate('/game', {state: {mode: 'infinite'}})}>
                            <h2 className="menu-h2">
                                <i className="bi bi-infinity" style={{marginRight: '0.5rem', fontSize: '1.8rem'}}></i>
                                Infinite Mode
                            </h2>
                            <p style={{fontSize: '1rem', color: '#ddd', marginBottom: '2rem', lineHeight:"1.5rem"}}>
                                Endless gameplay. Test your endurance!
                            </p>
                            {/*<button className="menu-mode-btn" onClick={() => console.log("infinite")}>Play</button>*/}
                        </div>

                        {/* Timer Mode */}
                        <div className="menu-card" onClick={() => navigate('/game', {state: {mode: 'timer'}})}>
                            <h2 className="menu-h2">
                                <i className="bi bi-clock" style={{marginRight: '0.5rem', fontSize: '1.8rem'}}></i>
                                Time Attack
                            </h2>
                            <p style={{fontSize: '1rem', color: '#ddd', marginBottom: '2rem',  lineHeight:"1.5rem"}}>
                                Race against the clock and beat your best time.
                            </p>
                            {/*<button className="menu-mode-btn">Play</button>*/}
                        </div>
                    </div>
                </main>
            <Footer/>
        </>
    );
};
