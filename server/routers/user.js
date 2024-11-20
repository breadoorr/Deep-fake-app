const express = require('express');
const cors = require('cors');

const {Login, Logout, Register, ConfirmEmail, UpdateProfile, GetProfile} = require("../controllers/userFuncs");

const user = express.Router();

user.post("/login", Login)
user.get("/logout", Logout);
user.post("/register", Register);
// user.post("/confirmEmail", ConfirmEmail);
user.get("/getProfile/:username", GetProfile)
user.put("/updateProfile", UpdateProfile);

user.get("/", (req, res, next) => {
    res.send("This is the user request")
});

module.exports = user;