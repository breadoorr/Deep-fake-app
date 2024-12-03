const express = require('express');
const cors = require('cors');

const {GetLevelTutorial, GetLevelClassic, GetLevelTimeLim, GetLevelInfinite, GetPictures, Answer, FinishGame} = require("../controllers/gameFuncs.js");

const game = express.Router();
game.use(cors());

game.get("/getPictures", GetPictures);
game.put("/end", FinishGame);

game.get("/", (req, res) => {
    res.send("This is the game page request")
});

module.exports = game;