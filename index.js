const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
const {db} = require('./controllers/db');
const bodyParser = require('body-parser');

const PORT = 3000;

const index = express();

const userRoute = require("./routers/user.js");
const gameRoute = require("./routers/game.js");

index.use(cors());
index.use(express.json());

index.use('/user', userRoute);
index.use('/game', gameRoute);

db();

index.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

index.listen(3000);