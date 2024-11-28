import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {Navigation} from "../components/Navigation";

export const Learning = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentInfo, setCurrentInfo] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    // Set body background color
    useEffect(() => {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#fff";
    }, []);

    const questions = [
        {
            question: "What is the primary technology behind deepfakes?",
            options: [
                "Blockchain",
                "Generative Adversarial Networks (GANs)",
                "Neural Style Transfer",
                "Convolutional Neural Networks",
            ],
            correct: 1,
        },
        {
            question: "What role does the discriminator play in the GAN process?",
            options: [
                "Detects fake content",
                "Generates fake content",
                "Collects training data",
                "Adjusts image resolution",
            ],
            correct: 0,
        },
        {
            question: "Which of the following is a positive use of deepfakes?",
            options: [
                "Fake news",
                "Political manipulation",
                "AI-assisted therapy",
                "Financial fraud",
            ],
            correct: 2,
        },
        {
            question: "What is a common sign of a deepfake?",
            options: [
                "Perfectly natural expressions",
                "Asymmetrical lighting or irregular blinking",
                "Flawless audio synchronization",
                "Consistent file metadata",
            ],
            correct: 1,
        },
        {
            question: "What is a common ethical concern regarding deepfakes?",
            options: [
                "Enhancing movie realism",
                "Invading privacy or spreading misinformation",
                "Reducing video production costs",
                "Training AI models",
            ],
            correct: 1,
        }
    ];

    const info = [
        {
            header: "Introduction to Deepfakes",
            content: "``Deepfake - synthetic media, including images, videos, and audio, generated by artificial intelligence (AI) technology that portray something that does not exist in reality or events that have never occurred.``(Payne, 2024)"
        },
        {
            header: "How Deepfakes Are Made",
            content: "Deepfakes involve training AI models on large datasets of images and videos. GANs use two networks—the generator (creates fake content) and the discriminator (detects fakes)—to iteratively improve the realism of generated media. Modern tools make creating deepfakes increasingly accessible."
        },
        {
            header: "Applications of Deepfakes",
                content: 'Positive Uses:' +
                    "- Entertainment" +
                    "- Education and Training" +
                    "Negative Uses:" +
                    "- Political Propaganda" +
                    "- Fake News" +
                    "- Fraud"
        },
        {
            header: "How to Distinguish Deepfakes from Real Media",
            content: "To distinguish deepfakes from real media, look for these signs:\n" +
                "\n" +
                "    Unnatural Details: Asymmetrical lighting, irregular facial expressions, or inconsistent blinking.\n" +
                "    Image Artifacts: Blurriness, pixelation, or strange boundaries around the face.\n" +
                "    Audio-Visual Mismatches: Discrepancies between lip movements and audio.\n" +
                "    Metadata Analysis: Checking file properties for signs of editing.\n" +
                "    Detection Tools: Software like Deepware Scanner or Microsoft's Video Authenticator."
        },
        {
            header: "Ethical and Legal Implications",
            content: "Deepfakes raise ethical concerns, such as invasion of privacy, reputational damage, and misuse in cybercrime. Legally, measures are limited, but some jurisdictions have introduced bans on harmful deepfake applications and mandatory disclosure for AI-generated content."
        }
    ];

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const handleRead = () => {
        if (currentPage < 10) {
            setCurrentPage(currentPage + 1)
        }
        if (currentInfo < info.length - 1) {
            setCurrentInfo(currentInfo + 1)
        }
    };

    const handleAnswer = (index) => {
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
        if (currentPage < 10) {
            setCurrentPage(currentPage + 1)
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizStarted(false);
        }
    };

    const containerStyle = {
        padding: "2.5rem",
        maxWidth: "600px",
        height: '500px',
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
            <div style={containerStyle}>

                {!quizStarted && currentPage === 0 && (
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
                { quizStarted && currentPage % 2 === 0 && (
                    <div>
                        <h2 style={{fontSize: "1.8rem", marginBottom: "1rem"}}>
                            {info[currentInfo].header}
                        </h2>
                        <div>
                            {info[currentInfo].content}
                            <button
                                onClick={() => handleRead()}
                                style={quizButtonStyle}
                                >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {quizStarted && currentPage % 2 !== 0 && (
                    <div>
                        <h2 style={{fontSize: "1.8rem", marginBottom: "1rem"}}>
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
                {!quizStarted && currentPage > 0 && (
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
                                setCurrentPage(0);
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
