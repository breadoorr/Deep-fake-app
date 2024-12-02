import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";

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
            <div
                className="game-container"
                style={{
                    width: '70%',
                    // maxWidth: '600px',
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

                <div
                    className="gallery"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: "repeat(2, 256px)",
                        gap: "20px",
                        justifyContent: "center",
                        padding: "1rem",

                        '@media (maxWidth: 756px)': {
                            display: 'flex',
                            flexDirection: "column",
                            // gap: "100px",
                            justifyContent: 'space-between',
                            width: '90%',
                            maxWidth: '600px',

                        },
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
                                width: "256px",
                                height: "256px",
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
                                    height: "100%",
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
            </div>
            <Footer />
            <style>
                {`
                html, body {
                    margin: 0;
                    height: 100%;
                }

                #root {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .game-container {
                    flex: 1; /* Ensures main content grows to fill space */
                }

                .gallery {
                    grid-template-columns: repeat(2, 250px);
                }

                .image-item {
                    width: 250px;
                    height: 250px;
                }
                
                @media (max-width: 600px) {
                    .gallery {
                        grid-template-columns: repeat(2, 150px);
                        gap: 10px;
                    }

                    .image-item {
                        width: 150px;
                        height: 150px;
                    }
                }
                `}
            </style>
        </>
    );
};
