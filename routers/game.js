const express = require('express');
const cors = require('cors');

const {GetLevel, Answer, FinishGame} = require("../controllers/gameFuncs.js");

const game = express.Router();
game.use(cors());

game.post("/getPicture", GetLevel);
game.post("/answer", Answer);
game.put("/end", FinishGame);

game.get("/", (req, res, next) => {
    res.send("This is the game page request")
});

module.exports = game;