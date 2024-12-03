import Footer from "../components/Footer";
import { Start } from "../components/Start";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import axios from "axios";


export const Game = () => {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [realImages, setRealImages] = useState([]);
    const [fakeImages, setFakeImages] = useState([]);
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
                setFakeImages(real);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const handleGameStart = () => {
            setGameStarted(true);
            getImages();
    }

    const handleImageClick = (answer) => {
        // if (pageNum < 10 && answer == "fake") {
        //     setScore(score + 1)
        //     console.log(answer);
        // }
        // setPageNum(pageNum + 1)

        // else {
        //     setGameStarted(false);
        // }
    }


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
            <button className="back-arrow-game" title="Go Back" onClick={() => navigate('/menu')}>
                <i className="bi bi-arrow-left"></i>
            </button>
            { !gameStarted && (
                    <Start onButtonClick={handleGameStart} />
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
                <h1 style={{ fontSize: "1.5rem", color: "#4CAF50", marginBottom: "1rem" }}>
                    Spot the Fake
                </h1>
                {/* <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "2rem" }}>
                    Scroll through the images below. Click an image if you guess it's "Fake".
                </p> */}

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
                            onClick={handleImageClick(item.correctAnswer)}
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
                
            <Footer />
        </>
    );
};

