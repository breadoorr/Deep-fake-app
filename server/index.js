const express = require('express');
const cors = require('cors');
const { db } = require('./controllers/db');

const PORT = 3000;
const app = express();

const userRoute = require("./routers/user.js");
const gameRoute = require("./routers/game.js");

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/game', gameRoute);

db();

app.get('/', (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

// Создаем сервер и экспортируем его
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
