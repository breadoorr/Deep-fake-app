const express = require('express');
const cors = require('cors');
const { db } = require('./controllers/db');
require('dotenv').config()

const PORT = 5000;
const app = express();

const userRoute = require("./routers/user.js");
const gameRoute = require("./routers/game.js");

app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true
}));
app.use(express.json());

app.use('/user', userRoute);
app.use('/game', gameRoute);

db();

app.get('/', (req, res) => {
  res.status(200);
  res.json({message: "Welcome to root URL of Server" });
});

// Создаем сервер и экспортируем его
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
