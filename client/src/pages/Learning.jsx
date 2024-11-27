import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {Navigation} from "../components/Navigation";

export const Learning = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Set body background color
    useEffect(() => {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#fff";
    }, []);

    const questions = [
        {
            question: "What is a deepfake?",
            options: [
                "An AI-generated fake video or image",
                "A type of malware",
                "A fake news article",
                "An online scam",
            ],
            correct: 0,
        },
        {
            question: "Which is a common sign of a deepfake?",
            options: [
                "Inconsistent lighting",
                "Perfectly natural expressions",
                "Seamless audio",
                "None of the above",
            ],
            correct: 0,
        },
        {
            question: "How can you verify if an image or video is fake?",
            options: [
                "Use reverse image search",
                "Check for reputable sources",
                "Inspect for inconsistencies",
                "All of the above",
            ],
            correct: 3,
        },
    ];

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const handleAnswer = (index) => {
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizStarted(false);
        }
    };

    const containerStyle = {
        padding: "2.5rem",
        maxWidth: "800px",
        margin: "6rem auto",
        backgroundColor: "rgba(50, 50, 50, 0.9)",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.6)",
        textAlign: "center",
        lineHeight: "1.8",
    };

    const listContainerStyle = {
        textAlign: "left",
        margin: "1.5rem auto",
        padding: "1rem",
        maxWidth: "600px",
        background: "rgba(70, 70, 70, 0.8)",
        borderRadius: "10px",
        boxShadow: "0 5px 10px rgba(0, 255, 128, 0.3)",
    };

    const listItemStyle = {
        fontSize: "1.1rem",
        marginBottom: "0.8rem",
        display: "flex",
        alignItems: "center",
    };

    const bulletIconStyle = {
        width: "10px",
        height: "10px",
        backgroundColor: "#4CAF50",
        borderRadius: "50%",
        marginRight: "10px",
    };

    const quizButtonStyle = {
        display: "block",
        margin: "1rem auto",
        padding: "1rem 1.5rem",
        background: "#333",
        color: "#fff",
        border: "1px solid #4CAF50",
        borderRadius: "5px",
        fontSize: "1rem",
        width: "100%",
        maxWidth: "300px",
        cursor: "pointer",
        transition: "background 0.3s",
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

    return (
        <>
            <Header />
            <Navigation />
            <div style={containerStyle}>

                {!quizStarted && currentQuestion === 0 && (
                    <>
                        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#4CAF50" }}>
                            Understanding Deepfakes
                        </h1>
                        <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "#ddd" }}>
                            Deepfakes are AI-generated media that can alter reality.
                            They can be used for both creative purposes and malicious intent.
                        </p>
                        <h2 style={{ marginBottom: "1rem", color: "#32a852", fontSize: "1.8rem" }}>
                            How to Spot Deepfakes
                        </h2>
                        <div style={listContainerStyle}>
                            <div style={listItemStyle}>
                                <span style={bulletIconStyle}></span>
                                <span>Look for unnatural facial expressions.</span>
                            </div>
                            <div style={listItemStyle}>
                                <span style={bulletIconStyle}></span>
                                <span>Check for inconsistent lighting or shadows.</span>
                            </div>
                            <div style={listItemStyle}>
                                <span style={bulletIconStyle}></span>
                                <span>Listen for mismatched or robotic audio.</span>
                            </div>
                            <div style={listItemStyle}>
                                <span style={bulletIconStyle}></span>
                                <span>Use tools like reverse image search or metadata analysis.</span>
                            </div>
                        </div>
                        <button onClick={startQuiz} style={buttonStyle}>
                            Start Quiz
                        </button>
                    </>
                )}
                {quizStarted && (
                    <div>
                        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                            {questions[currentQuestion].question}
                        </h2>
                        <div>
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    style={quizButtonStyle}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {!quizStarted && currentQuestion > 0 && (
                    <div>
                        <h2 style={{ color: "#4CAF50", fontSize: "2rem", marginBottom: "1rem" }}>
                            Quiz Completed!
                        </h2>
                        <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
                            Your Score: <strong>{score}/{questions.length}</strong>
                        </p>
                        <button
                            onClick={() => {
                                setQuizStarted(false);
                                setScore(0);
                                setCurrentQuestion(0);
                            }}
                            style={buttonStyle}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};
