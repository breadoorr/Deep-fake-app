import Footer from "../components/Footer";
import { Start } from "../components/Start";
import Header from "../components/Header";
import React, { useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Game.css";
import axios from "axios";
import { LoadingScreen } from "./Loading";
import { useUser } from "../context/UserContext";

const Timer = ({ duration, isRunning, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    React.useEffect(() => {
        let intervalId;
        if (isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        onTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, timeLeft, onTimeUp]);

    return (
        <h2
            className="timer"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                color: timeLeft <= 5 ? '#FF0000' : '#4CAF50',
                gap: '0.5rem',
                boxShadow: '0 0 10px rgba(0, 255, 128, 0.3)'
            }}
        >
            <i className="bi bi-clock"></i>
            {timeLeft}s
        </h2>
    );
};



export const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode || 'regular';
    const {userId} = useUser();

    // Refs for mutable values
    const imagesRef = useRef([]);
    const scoreRef = useRef(0);
    const pageNumRef = useRef(0);
    const currentRoundImagesRef = useRef([]);
    const feedbackRef = useRef("");

    // States
    const [gameState, setGameState] = useState({
        gameStarted: false,
        imagesLoaded: false
    });

    const [timerState, setTimerState] = useState({
        isRunning: false,
        duration: 30
    });

    const [finalScore, setFinalScore] = useState(0);
    const [finalRounds, setFinalRounds] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [saved, setSaved] = useState(false);

    

    const getImages = useCallback(async () => {
        try {
            const response = await fetch('https://breadoorr.github.io/Deep-fake-app/images.json'); 
    
            if (!response.ok) {
                console.error('Failed to fetch images.json:', response.status, response.statusText);
                return false;
            }
    
            const text = await response.text();
    
            let jsonData;
            try {
                jsonData = JSON.parse(text);
            } catch (err) {
                console.error('JSON parse error:', err);
                return false;
            }

            imagesRef.current = [
                ...jsonData.real.map(url => [url, 'real']),
                ...jsonData.fake.map(url => [url, 'fake'])
            ];
            return true;
        } catch (err) {
            console.error('Image loading error from JSON:', err);
            return false;
        }
    }, []);

    const randomizeRoundImages = useCallback(() => {
        if (imagesRef.current.length === 0) return [];
        return Array.from({ length: 4 }, () => {
            const randomIndex = Math.floor(Math.random() * imagesRef.current.length);
            return {
                src: imagesRef.current[randomIndex][0],
                correctAnswer: imagesRef.current[randomIndex][1]
            };
        });
    }, []);

    const resetGame = useCallback(() => {
        scoreRef.current = 0;
        pageNumRef.current = 0;
        feedbackRef.current = "";
        currentRoundImagesRef.current = [];
    }, []);

    const startLoadingGame = useCallback(async () => {
        setIsLoading(true);

        const success = await getImages();
        if (success) {
            currentRoundImagesRef.current = randomizeRoundImages();

            setGameState({
                gameStarted: true,
                imagesLoaded: true
            });

            // Start timer for timer mode
            if (mode === 'timer') {
                setTimerState({
                    isRunning: true,
                    duration: 30
                });
            }
        }
        setIsLoading(false);
    }, [getImages, randomizeRoundImages, mode]);

    const handleGameStart = useCallback(() => {
        resetGame();
        startLoadingGame();
    }, [resetGame, startLoadingGame]);

    const handleGameFinish = useCallback(async() => {
        setGameState({
            gameStarted: false,
            imagesLoaded: false
        });

        setTimerState(prev => ({
            ...prev,
            isRunning: false
        }));

        // Store final results in state
        setFinalScore(scoreRef.current);
        setFinalRounds(pageNumRef.current);

        if (userId && !saved) {
            try {
                await axios.post('https://deep-fake-app.vercel.app/game/end', {
                    userId: userId,
                    score: scoreRef.current,
                    pageNum: pageNumRef.current
                });
                console.log('Stats saved successfully.');
                setSaved(true);
            } catch (err) {
                console.error('Error saving stats:', err);
            }
        }
    }, []);

    const handleImageClick = useCallback((answer) => {
        // Update score
        if (answer === "fake") {
            scoreRef.current += 1;
            feedbackRef.current = "Correct! It's fake.";
        } else {
            feedbackRef.current = "Incorrect! It's real.";
        }

        // Increment page number
        pageNumRef.current += 1;

        // Check game over conditions
        const isGameOver = mode === 'regular' 
            ? pageNumRef.current >= 10 
            : false;

        if (isGameOver) {
            handleGameFinish();
            return;
        }

        // Randomize next round images
        currentRoundImagesRef.current = randomizeRoundImages();

        // Force a small re-render to update UI
        setGameState(prev => ({ ...prev }));
    }, [mode, handleGameFinish, randomizeRoundImages]);

    // Styles
    const styles = {
        gameContainer: {
            width: '70%',
            flex: 1,
            paddingTop: "100px",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
            color: "#fff"
        },
        scoreBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            marginBottom: '1rem',
            boxShadow: '0 0 10px rgba(0, 255, 128, 0.3)'
        }
    };

    return (
        <>
            <Header />
            <button className="back-arrow-game" title="Go Back" onClick={() => navigate('/menu')}>
                <i className="bi bi-arrow-left"></i>
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-game">
                        <button className="close-modal" onClick={() => setShowModal(false)}>
                            &times; {/* Close icon */}
                        </button>
                        <p>Are you sure you want to quit? Your results will not be saved.</p>
                        <div className="modal-buttons">
                            <button onClick={() => navigate('/menu')}>Yes</button>
                            <button onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Show loading after Start is clicked, before game starts */}
            {isLoading && (
                <LoadingScreen />
            )}

            {/* Show Start screen if not loading, not started, and no final rounds */}
            {!isLoading && !gameState.gameStarted && finalRounds === 0 && (
                <Start mode={mode} onButtonClick={handleGameStart} />
            )}

            {/* Game Screen */}
            {gameState.gameStarted && !isLoading && (
                <div className="game-container" style={styles.gameContainer}>
                    <div style={styles.scoreBar}>
                        <h2 className="score-text">
                            Score: <span>{scoreRef.current}</span>
                        </h2>
                        {mode === 'regular' && (
                            <h2 style={{ fontSize: '1.2rem', color: '#ccc' }}>
                                Round: <span style={{ color: '#4CAF50' }}>{pageNumRef.current + 1}/10</span>
                            </h2>
                        )}
                        {mode === 'timer' && (
                            <Timer 
                                duration={timerState.duration} 
                                isRunning={timerState.isRunning}
                                onTimeUp={handleGameFinish}
                            />
                        )}

                        {mode === 'infinite' && (
                            <button className={'finish-button'}
                            onClick={handleGameFinish}>
                            Finish
                            </button>
                        )}
                    </div>

                    <h1 style={{ fontSize: "1.5rem", color: "#4CAF50", marginBottom: "1rem" }}>
                        Spot the Fake
                    </h1>

                    <div className="gallery">
                        {gameState.imagesLoaded && currentRoundImagesRef.current.map((item, index) => (
                            <div 
                                key={index} 
                                className="image-item" 
                                onClick={() => handleImageClick(item.correctAnswer)}
                            >
                                <img 
                                    src={item.src} 
                                    alt={`Image ${index + 1}`} 
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    <div 
                        className="feedback" 
                        style={{ 
                            marginTop: "20px", 
                            fontSize: "1.2rem", 
                            color: feedbackRef.current.includes("Correct") ? "#4CAF50" : "#E53935", 
                            minHeight: "24px" 
                        }}
                    >
                        {feedbackRef.current}
                    </div>
                </div>
            )}

            {/* Try Again Screen */}
            {!gameState.gameStarted && !isLoading && finalRounds > 0 && (
                <div className="try-again-container" style={{ textAlign: 'center', marginTop: '100px', color: '#fff' }}>
                    <h2 style={{ color: "#4CAF50", fontSize: "2rem", marginBottom: "1rem" }}>
                        {mode === 'regular' || mode === 'infinite' ? 'Game Completed!' : 'Time\'s Up!'}
                    </h2>
                    <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
                        Your Score: <strong>{finalScore}/{finalRounds}</strong>
                    </p>
                    <button onClick={handleGameStart}>
                        Try Again
                    </button>
                </div>
            )}

            <Footer />
        </>
    );
};
