import Footer from "../components/Footer";
import { Start } from "../components/Start";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Game.css";
import axios from "axios";
import { useUser } from "../context/UserContext";

export const Game = () => {
    const {userId} = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode || 'regular';
    const [feedback, setFeedback] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const intervalRef = useRef(null);  // To store interval ID
    const isTimerRunning = useRef(false); // Flag to track if the timer is running
    const timerRef = useRef(30); // Store timer value in useRef

    const realImages = useRef([]);  // Store the images in useRef
    const fakeImages = useRef([]);  // Store the fake images in useRef
    const imagesLoaded = useRef(false); // Flag to track if images are loaded

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

    // Fetch images once when the game starts
    const getImages = async () => {
        try {
            const result = await axios.get('https://deep-fake-app.vercel.app/game/getPictures')
            const real = [];
            const fake = [];

            // Populate real images
            result.data.real.forEach(image => {
                // console.log(image.ImageReal.data)
                const blob = new Blob([new Uint8Array(image.ImageReal.data)], { type: 'image/jpg' });
                const url = URL.createObjectURL(blob);
                real.push(url);
            });

            // Populate fake images
            result.data.fake.forEach(image => {
                const blob = new Blob([new Uint8Array(image.ImageFake.data)], { type: 'image/jpg' });
                const url = URL.createObjectURL(blob);
                fake.push(url);
            });

            // Store images in refs (will not trigger re-renders)
            realImages.current = real;
            fakeImages.current = fake;
            // imagesLoaded.current = true; // Mark images as loaded
        } catch (err) {
            console.log(err);
        }
    };

    const handleGameStart = () => {
        setGameStarted(true);
        getImages();  // Fetch images only once when the game starts
        if (mode === 'timer') {
            timerRef.current = 30;  // Start the timer for Time Attack mode
        }
    };

    const handleGameFinish = async () => {
        setGameStarted(false);
        clearInterval(intervalRef.current); // Clear interval when game finishes
        isTimerRunning.current = false; // Stop the timer flag

        const result = await axios.post('https://deep-fake-app.vercel.app/game/end', {userId, score, pageNum}, {withCredentials: true})

        console.log(result);

    };

    const handleImageClick = (answer) => {
        if (answer === "fake") {
            setScore(score + 1);
            setFeedback("Correct! It's fake.");
        } else {
            setFeedback("Incorrect! It's real.");
        }
        setPageNum(pageNum + 1);  // Move to the next page/round
        if (mode === 'regular' && pageNum === 9) {
            handleGameFinish();
        }
    };

    // Timer Logic handled in useEffect to avoid re-renders
    useEffect(() => {
        if (gameStarted && mode === 'timer' && !isTimerRunning.current) {
            intervalRef.current = setInterval(() => {
                if (timerRef.current > 0) {
                    timerRef.current -= 1; // Decrease timer
                } else {
                    handleGameFinish();
                }
            }, 1000); // Run every second
            isTimerRunning.current = true; // Flag to prevent re-starting the timer
        }

        return () => {
            clearInterval(intervalRef.current); // Cleanup interval on component unmount
        };
    }, [gameStarted, mode]);

    // Shuffle the images once after they are loaded and pick 4 random ones
    const getRandomImages = () => {
        // Only shuffle and select images if they have been loaded
        // if (imagesLoaded.current) {
            const shuffledFakeImages = [...fakeImages.current].sort(() => Math.random() - 0.5);
            const shuffledRealImages = [...realImages.current].sort(() => Math.random() - 0.5);

            // Pick 2 fake and 2 real images
            const selectedFakeImages = shuffledFakeImages.slice(0, 2);
            const selectedRealImages = shuffledRealImages.slice(0, 2);

            return [
                ...selectedFakeImages.map((src, index) => ({ src, alt: `Fake Image ${index + 1}`, correctAnswer: "fake" })),
                ...selectedRealImages.map((src, index) => ({ src, alt: `Real Image ${index + 1}`, correctAnswer: "real" }))
            ].sort(() => Math.random() - 0.5); // Shuffle to mix fake and real images
        // }
        // return [];
    };

    return (
        <>
            <Header />
            {/* Back Arrow */}
            <button className="back-arrow-game" title="Go Back" onClick={() => navigate('/menu')}>
                <i className="bi bi-arrow-left"></i>
            </button>
            { !gameStarted && pageNum === 0 && (
                    <Start mode={mode} onButtonClick={handleGameStart} />
                ) }

            { gameStarted && (
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
                        {mode === 'timer' && timerRef.current > 0 && (
                        <h2 style={{ fontSize: '1.5rem', color: '#F44336' }}>
                            Time Left: {timerRef.current}s
                        </h2>
                        )}
                    </div>

                    <h1 style={{ fontSize: "1.5rem", color: "#4CAF50", marginBottom: "1rem" }}>
                        Spot the Fake
                    </h1>

                    <div className="gallery">
                    {getRandomImages().map((item, index) => (
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
            {!gameStarted && pageNum > 0 && (
                <div className="try-again-container">
                    <h2 style={{ color: "#4CAF50", fontSize: "2rem", marginBottom: "1rem" }}>
                        Game Completed!
                    </h2>
                    <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
                        Your Score: <strong>{score}/{pageNum}</strong>
                    </p>
                    <button
                        onClick={() => {
                            setGameStarted(false);
                            setScore(0);
                            setPageNum(0);
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            <Footer />
        </>
    );
};

