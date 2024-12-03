const { pool } = require("./db");

// Block of constants to support different game modes
const defPicAmount = 10; // Max amount of picture pairs in a level

// Block of variables to keep track of the game process
let gameMode = 0;      // For several game modes functionality
let gameScore = 0;     // In-game score
let pictureNumber = 0; // Current pair of picture
let nextPicID = 0;     // Next picture's ID from a DB

let picBatch;

let continueGame, prevGameScore, prevPictureNumber, prevPictureID; // variables for a function to continue a game

function extractStrings(input) {
    const tmp = [];

    function traverse(item) {
        if (Array.isArray(item)) {
            item.forEach(traverse);
        } else if (item && typeof item === 'object' && item.Text) {
            tmp.push(item.Text);
        } else if (typeof item === 'string') {
            tmp.push(item);
        }
    }

    traverse(input);
    return tmp;
}

// Initiate a tutorial level
exports.GetLevelTutorial = async (req, res) => {
    // callFunc(GetPictures)
    console.log("Tutorial Started");
    res.status(200);
}

// Initiate a classic game with a score and a limited amount of pictures
exports.GetLevelClassic = async (req, res) => {
    // callFunc(GetPictures)
    console.log("Game Started");
    res.status(200);
}

// Initiate a game with a score and a limited amount of pictures, but you also have time limitations
exports.GetLevelTimeLim = async (req, res) => {
    // callFunc(GetPictures)
    console.log("Game Started with a timer");
    res.status(200);
}

// Initiate a game with unlimited amount of pictures (70K)
exports.GetLevelInfinite = async (req, res) => {
    // callFunc(GetPictures)
    console.log("Game Started with a timer");
    res.status(200);
}

// Pull a pair of pictures from a DB
exports.GetPictures = async (req, res) => {
        

    try {
        const sql1 = "SELECT ImageReal, ImageFake FROM ImageInfo LIMIT 20";
        let result = await pool.execute(sql1);

        res.status(202).json( { "real": result[0], "fake": result[0] } )
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
}

// Function, which responds to a user answer
exports.Answer = async (req, res) => {
    const id = req.body;
    if (id == "fake") {
        gameScore += 1;
        res.status(200);
    } else {
        res.status(200);
    }
    console.log("Process answer");
    res.status(200);
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

