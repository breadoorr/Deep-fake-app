import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import "./Game.css";

export const Game = () => {
    const [feedback, setFeedback] = useState("");

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

    const handleImageClick = (correctAnswer) => {
        setFeedback(correctAnswer === "real" ? "Correct! It's Real." : "Incorrect! It's Fake.");

        setTimeout(() => {
            setFeedback("");
        }, 2000);
    };

    useEffect(() => {
        Object.assign(document.body.style, GameBodyStyle);

        return () => {
            Object.assign(document.body.style, {
                backgroundColor: "",
                color: "",
                minHeight: "",
                display: "",
                flexDirection: "",
            });
        };
    }, []);

    return (
        <>
            <Header />
            {/* Back Arrow */}
            <a href="#" className="back-arrow-game" title="Go Back">
                <i className="bi bi-arrow-left"></i>
            </a>
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
                <h1 style={{ fontSize: "1.5rem", color: "#4CAF50", marginBottom: "1rem" }}>
                    Spot the Fake
                </h1>
                <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "2rem" }}>
                    Scroll through the images below. Click an image if you guess it's "Fake".
                </p>

                <div className="gallery">
                    {[
                        { src: "../pics/fake1.jpg", alt: "Person 1", correctAnswer: "fake" },
                        { src: "../pics/fake2.jpg", alt: "Person 2", correctAnswer: "real" },
                        { src: "../pics/fake1.jpg", alt: "Person 3", correctAnswer: "real" },
                        { src: "../pics/fake2.jpg", alt: "Person 4", correctAnswer: "real" },
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
            <Footer />
        </>
    );
};
