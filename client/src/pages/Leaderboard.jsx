export const Leaderboard = () => {
    return (
        <main className="leaderboard-container">
            <h1>Leaderboard</h1>
            <p>See how you rank among other players!</p>

            <table className="leaderboard">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Total Points</th>
                    <th>Games Played</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td><i className="fas fa-crown"></i> Nyan Meow</td>
                    <td>12,500</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Pixel Master</td>
                    <td>10,800</td>
                    <td>110</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Game Guru</td>
                    <td>9,500</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Speed Racer</td>
                    <td>8,900</td>
                    <td>95</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Code Ninja</td>
                    <td>8,200</td>
                    <td>90</td>
                </tr>
                </tbody>
            </table>
        </main>
    )
}