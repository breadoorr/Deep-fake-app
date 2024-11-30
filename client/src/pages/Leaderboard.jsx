import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";

export const Leaderboard = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#fff";
        document.body.style.margin = "0";
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";
        document.body.style.minHeight = "100vh";
    }, []);

    const containerStyle = {
        maxWidth: "900px",
        margin: "4rem auto",
        textAlign: "center",
        padding: "2rem",
        flex: 1,
    };

    const titleStyle = {
        fontSize: "2rem",
        marginBottom: "1rem",
        color: "#4CAF50",
    };

    const subtitleStyle = {
        fontSize: "1rem",
        color: "#ccc",
        marginBottom: "2rem",
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "1rem",
        textAlign: "center",
    };

    const theadStyle = {
        background: "#444",
        color: "#fff",
    };

    const cellStyle = {
        padding: "1rem",
        border: "1px solid #333",
        fontSize: "1rem",
        color: "#fff",
    };

    const oddRowStyle = {
        background: "rgba(255, 255, 255, 0.05)",
    };

    const evenRowStyle = {
        background: "rgba(255, 255, 255, 0.1)",
    };

    const rankStyle = {
        fontWeight: "bold",
    };

    const crownStyle = {
        color: "#FFD700",
        marginRight: "0.5rem",
    };

    const mobileResponsiveStyle = {
        fontSize: "0.9rem",
        padding: "0.8rem",
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={containerStyle}>
                <h1 style={titleStyle}>Leaderboard</h1>
                <p style={subtitleStyle}>See how you rank among other players!</p>

                <table style={tableStyle}>
                    <thead style={theadStyle}>
                    <tr>
                        <th style={cellStyle}>Rank</th>
                        <th style={cellStyle}>Player</th>
                        <th style={cellStyle}>Total Points</th>
                        <th style={cellStyle}>Games Played</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={oddRowStyle}>
                        <td style={{ ...cellStyle, ...rankStyle, ...mobileResponsiveStyle }}>1</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>
                            <i className="fas fa-crown" style={crownStyle}></i> Nyan Meow
                        </td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>12,500</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>120</td>
                    </tr>
                    <tr style={evenRowStyle}>
                        <td style={{ ...cellStyle, ...rankStyle, ...mobileResponsiveStyle }}>2</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>Pixel Master</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>10,800</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>110</td>
                    </tr>
                    <tr style={oddRowStyle}>
                        <td style={{ ...cellStyle, ...rankStyle, ...mobileResponsiveStyle }}>3</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>Game Guru</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>9,500</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>100</td>
                    </tr>
                    <tr style={evenRowStyle}>
                        <td style={{ ...cellStyle, ...rankStyle, ...mobileResponsiveStyle }}>4</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>Speed Racer</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>8,900</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>95</td>
                    </tr>
                    <tr style={oddRowStyle}>
                        <td style={{ ...cellStyle, ...rankStyle, ...mobileResponsiveStyle }}>5</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>Code Ninja</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>8,200</td>
                        <td style={{ ...cellStyle, ...mobileResponsiveStyle }}>90</td>
                    </tr>
                    </tbody>
                </table>
            </main>
            <Footer />
            <style>
                {`
                @media (max-width: 600px) {
                    h1 {
                        font-size: 1.5rem;
                    }

                    p {
                        font-size: 0.9rem;
                    }

                    th, td {
                        padding: 0.6rem;
                        font-size: 0.8rem;
                    }
                }
                `}
            </style>
        </div>
    );
};
