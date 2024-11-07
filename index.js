const express = require('express');
const cors = require('cors');
const sql = require('mysql2');
// const bodyParser = require('body-parser');

const PORT = 3000;

const index = express();

const userRoute = require("./routers/user.js");
const gameRoute = require("./routers/game.js");

index.use(cors());
index.use('/user', userRoute);
index.use('/game', gameRoute);

const db = sql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

index.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});

index.listen(PORT, (error) => {
        if (!error)
            console.log("Server is Successfully Running, and App is listening on port " + PORT);
        else
            console.log("Error occurred, server can't start", error);
    }
);