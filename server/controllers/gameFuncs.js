const { pool } = require("./db");

// Block of constants to support different game modes
const defPicAmount = 10; // Max amount of picture pairs in a level

// Block of variables to keep track of the game process
let gameMode = 0;      // For several game modes functionality
let gameScore = 0;     // In-game score

// Pull a pair of pictures from a DB
exports.GetPictures = async (req, res) => {
    try {
        const sql1 = "SELECT ImageReal, ImageFake FROM ImageInfo LIMIT 100";
        let result = await pool.execute(sql1);

        res.status(202).json( { "real": result[0], "fake": result[0] } )
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
}


// Game results processing
exports.FinishGame = async (req, res) => {
    continueGame = false;
    try {
        const sql1 = "SELECT (highScore, totalScore, totalGames) FROM Users username=${username}";
        const [result] = await pool.execute(sql1, [username]);
        const lastScore = gameScore;
        let highScore = result[0];
        if (highScore < lastScore) {
            highScore = lastScore;
        }
        const totalScore = result[1] + gameScore;
        const totalGames = result[2] + 1;
        const avgScore = totalScore / totalGames;
        const sql2 = "UPDATE Users SET lastScore=${db.escape(lastScore)}, highScore=${db.escape(highScore)}, avgScore=${db.escape(avgScore)}, totalScore=${db.escape(totalScore)}, totalGames=${db.escape(totalGames)} WHERE username=${db.escape(username)}";

        console.log("Process endgame results");
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
}

