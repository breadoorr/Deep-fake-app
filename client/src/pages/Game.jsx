import Footer from "../components/Footer";
import { Start } from "../components/Start";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Game.css";
import axios from "axios";


export const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode || 'regular';
    const [feedback, setFeedback] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [realImages, setRealImages] = useState([]);
    const [fakeImages, setFakeImages] = useState([]);
    const [timer, setTimer] = useState(0);
    // const navigate = useNavigate();

    const GameBodyStyle = {
        flex: 1,
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "'Press Start 2P', cursive",
        margin: 0,
        padding: 0,
        lineHeight: 1.6,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    };

    const buttonStyle = {
        marginTop: "2rem",
        padding: "1rem 2rem",
        background: "linear-gradient(45deg, #4CAF50, #32a852)",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "all 0.3s",
    };


    const getImages = async () => {
        try {
            const result = await axios.get('http://localhost:5000/game/getPictures')
            const real = []
            const fake = []

            for (let image in result.data.real) {
                const blob = new Blob([new Uint8Array(result.data.real[image].ImageReal.data)], { type: 'image/jpg' });
                const url = URL.createObjectURL(blob);
                real.push(url);
                setRealImages(real);
            }
            for (let image in result.data.fake) {
                const blob = new Blob([new Uint8Array(result.data.fake[image].ImageFake.data)], { type: 'image/jpg' });
                const url = URL.createObjectURL(blob);
                fake.push(url);
                setFakeImages(fake);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const handleGameStart = () => {
        setGameStarted(true);
        getImages();
        if (mode === 'timer') {
            setTimer(30);  // Start the timer for Time Attack mode
        }
    }

    const handleImageClick = (answer) => {
        if (answer === "fake") {
            setScore(score + 1);
            setFeedback("Correct! It's fake.");
        } else {
            setFeedback("Incorrect! It's real.");
        }
        setPageNum(pageNum + 1);  // Move to the next page/round
        if (mode === 'regular' && pageNum == 9) {
            setGameStarted(false);
        }
    };

    const handleTimer = () => {
        if (mode === 'timer' && timer >= 0) {
            setTimeout(() => setTimer(timer - 1), 1000);  // Decrease the timer every second
        }
        else {
            setGameStarted(false);
        }
    }
    
    const galleryItems = [
        ...fakeImages.map((src, index) => ({ src, alt: `Fake Image ${index + 1}`, correctAnswer: "fake" })),
        ...realImages.map((src, index) => ({ src, alt: `Real Image ${index + 1}`, correctAnswer: "real" })),
    ];

    // const shuffledGalleryItems = shuffleArray(galleryItems);
    const shuffledGalleryItems = galleryItems.sort(() => Math.random() - 0.5);
    
    // useEffect(() => {
    //     Object.assign(document.body.style, GameBodyStyle);
    //     if (gameStarted && mode === 'timer') {
    //         handleTimer();  // Start the timer when game starts in Time Attack mode
    //     }

    //     return () => {
    //         Object.assign(document.body.style, {
    //             backgroundColor: "",
    //             color: "",
    //             minHeight: "",
    //             display: "",
    //             flexDirection: "",
    //         });
    //     };
    // }, [gameStarted, mode, timer]);


    useEffect(() => {
        Object.assign(document.body.style, GameBodyStyle);

        if (gameStarted && mode === 'timer') {
            handleTimer();  // Start the timer when game starts in Time Attack mode
        }

        return () => {
            Object.assign(document.body.style, {
                backgroundColor: "",
                color: "",
                minHeight: "",
                display: "",
                flexDirection: "",
            });
        };
    }, [gameStarted, mode, timer]);

    return (
        <>
            <Header />
            {/* Back Arrow */}
            <button className="back-arrow-game" title="Go Back" onClick={() => navigate('/menu')}>
                <i className="bi bi-arrow-left"></i>
            </button>
            { !gameStarted && pageNum === 0 && (
                    <Start onButtonClick={handleGameStart} />
                ) }

            {  gameStarted && (
                <div
                    className="game-container"
                    style={{
                        width: '70%',
                        flex: 1,
                        paddingTop: "100px",
                        maxWidth: "1000px",
                        margin: "0 auto",
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    {/* Score Display */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '10px',
                            marginBottom: '1rem',
                            boxShadow: '0 0 10px rgba(0, 255, 128, 0.3)',
                        }}
                    >
                        <h2 style={{ fontSize: '1.2rem', color: '#ccc' }}>Score: <span style={{ color: '#4CAF50' }}>{score}</span></h2>
                        {mode === 'regular' && (<h2 style={{ fontSize: '1.2rem', color: '#ccc' }}>Round: <span style={{ color: '#4CAF50' }}>{pageNum}/10</span></h2>
                        )}
                        {mode === 'timer' && timer > 0 && (
                        <h2 style={{ fontSize: '1.5rem', color: '#F44336' }}>
                            Time Left: {timer}s
                        </h2>
                        )}
                        {mode === 'infinite' && (<button onClick={() => setGameStarted(false)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#E53935', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Finish Game
                        </button>
                        )}
                    </div>

                    <h1 style={{ fontSize: "1.5rem", color: "#4CAF50", marginBottom: "1rem" }}>
                        Spot the Fake
                    </h1>
                    

                    <div className="gallery">
                    {[
                        { src: `${fakeImages[Math.floor(Math.random()*fakeImages.length)]}`, alt: "Person 3", correctAnswer: "fake" },
                        { src: `${realImages[Math.floor(Math.random()*realImages.length)]}`, alt: "Person 2", correctAnswer: "real" },
                        { src: `${fakeImages[Math.floor(Math.random()*fakeImages.length)]}`, alt: "Person 4", correctAnswer: "fake" },
                        { src: `${realImages[Math.floor(Math.random()*realImages.length)]}`, alt: "Person 1", correctAnswer: "real" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="image-item"
                            onClick={() => handleImageClick(item.correctAnswer)}
                        >
                            <img src={item.src} alt={item.alt} />
                        </div>
                    ))}
                    </div>

                <div
                    className="feedback"
                    style={{
                        marginTop: "20px",
                        fontSize: "1.2rem",
                        color: feedback.includes("Correct") ? "#4CAF50" : "#E53935",
                        minHeight: "24px",
                    }}
                >
                    {feedback}
                </div>
            
                </div>
                )}
                { !gameStarted && pageNum > 0 && (
                    <div>
                    <h2 style={{ color: "#4CAF50", fontSize: "2rem", marginBottom: "1rem" }}>
                        Quiz Completed!
                    </h2>
                    <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
                        Your Score: <strong>{score}/{pageNum}</strong>
                    </p>
                    <button
                        onClick={() => {
                            setGameStarted(false);
                            setScore(0);
                            setPageNum(0)
                        }}
                        style={buttonStyle}
                    >
                        Try Again
                    </button>
                </div>
                )}
                
            <Footer />
        </>
    );
};

