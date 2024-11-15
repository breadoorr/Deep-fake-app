const express = require('express');
const cors = require('cors');

const {GetLevelTutorial, GetLevelClassic, GetLevelTimeLim, GetLevelInfinite, GetPictures, Answer, FinishGame} = require("../controllers/gameFuncs.js");

const game = express.Router();
game.use(cors());

game.post("/startTutorial", GetLevelTutorial);
game.post("/startClassic", GetLevelClassic);
game.post("/startTimeLimited", GetLevelTimeLim);
game.post("/startInfinite", GetLevelInfinite);
game.post("/getPicture", GetPictures);
game.post("/answer", Answer);
game.put("/end", FinishGame);

game.get("/", (req, res) => {
    res.send("This is the game page request")
});

module.exports = game;