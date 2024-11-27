import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";


export const Game = () => {
    const [feedback, setFeedback] = useState("");

    const GameBodyStyle = {
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "'Press Start 2P', cursive",
        margin: 0,
        padding: 0,
        lineHeight: 1.6,
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
            });
        };
    }, []);

    return (
        <>
            <Header />
            <section
                className="game-section"
                style={{
                    paddingTop: "100px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    textAlign: "center",
                    color: "#fff",
                }}
            >
                <h1 style={{ fontSize: "2rem", color: "#4CAF50", marginBottom: "1rem" }}>
                    Spot the Fake
                </h1>
                <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "2rem" }}>
                    Scroll through the images below. Click an image to guess if it's "Real" or "Fake".
                </p>

                <div
                    className="gallery"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "1rem",
                    }}
                >
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
                            style={{
                                width: "calc(40% - 20px)",
                                background: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                boxShadow: "0 0 10px rgba(0, 255, 128, 0.2)",
                                padding: "10px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                }}
                            />
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
            </section>
            <Footer />
        </>
    );
};