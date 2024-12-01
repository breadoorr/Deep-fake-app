const express = require('express');
const cors = require('cors');

const {GetLevelTutorial, GetLevelClassic, GetLevelTimeLim, GetLevelInfinite, GetPictures, Answer, FinishGame} = require("../controllers/gameFuncs.js");

const game = express.Router();
game.use(cors());

game.get("/startTutorial", GetLevelTutorial);
game.get("/startClassic", GetLevelClassic);
game.get("/startTimeLimited", GetLevelTimeLim);
game.get("/startInfinite", GetLevelInfinite);
game.get("/getPicture", GetPictures);
game.post("/answer", Answer);
game.put("/end", FinishGame);

game.get("/", (req, res) => {
    res.send("This is the game page request")
});

module.exports = game;