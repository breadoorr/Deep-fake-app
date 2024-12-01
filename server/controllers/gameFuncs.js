const { pool } = require("./db");

// Block of constants to support different game modes
const picturesAmount = 10; // Max amount of picture pairs in a level

// Block of variables to keep track of the game process
let gameMode = 0;      // For several game modes functionality
let gameScore = 0;     // In-game score
let pictureNumber = 0; // Current pair of picture
let nextPictureID = 0; // Next picture's ID from a DB

let continueGame, prevGameScore, prevPictureNumber, prevPictureID; // variables for a function to continue a game

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
    if (pictureNumber < picturesAmount) {
        pictureNumber += 1;
        try {
            const sql = "SELECT ImageReal, ImageFake FROM ImageInfo LIMIT 100;";
            const [result] = await pool.execute(sql, []);

            // if (Math.floor(Math.random() * 101) > 50) {
            //     // const imgFake = result[0].image_data.toString('base64');
                
            //     // prevPictureID = nextPictureID;
            //     // nextPictureID += 1;
            // } else {
            //     // const imgFake = result[0].image_data.toString('base64');
            //     let imgFake = result[2]
            //     let imgReal = result[1]
            //     prevPictureID = nextPictureID;
            //     nextPictureID += 1;
            // }


            // let imgFake = result[0].ImageFake
            // let imgReal = result[0].ImageReal
            res.status(201).json(result[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Error getting images"});
        }
    } else {
        console.log("Game finished");
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

