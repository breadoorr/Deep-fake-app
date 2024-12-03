const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetPictures } = require('./gameFuncs')

// const {pool} = require('');

const { pool } = require("./db");

const nodemailer = require('nodemailer');

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

exports.GetProfile = async (req, res) => {
    const userId = req.body.userId;
    try {
        const sql = "SELECT * FROM UserInfo WHERE UserID = ?";
        const [result] = await pool.execute(sql, [userId]);

        res.status(203).json({user: result[0]});
    } catch(err) {
        console.log(err);
        res.status(500).json({"error": "Database error"});
    }
}

exports.Login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const sql = "SELECT * FROM UserInfo WHERE Username = ?";
        const [result] = await pool.execute(sql, [username]);

        if (result.length > 0) {
            const user = result[0];
            const passOk = bcrypt.compareSync(password, user.Password);
            if (passOk) {
                const userId = user.UserID;
                jwt.sign({userId, username}, jwtSecret, {expiresIn: '1d'}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {sameSite: "none", secure: true});
                    res.status(201).json({id: user.UserID});
                });
            } else {
                res.status(401).json({message: "Invalid password"});
            }
        } else {
            res.status(401).json({message: "Invalid username"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
}

exports.Logout = async (req, res) => {
    res.cookie('token', '', {sameSite: 'none', secure: true, httpOnly: true}).json({id: null});
}

exports.Register = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const image = GetPictures();
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const sql = "INSERT INTO UserInfo (Username, Password, Email) VALUES (?, ?, ?)";
        const [result] = await pool.execute(sql, [username, hashedPassword, email]);
        const userId = result.UserID;

        const sqlImage = "INSERT INTO UserInfo (ImageID) VALUES (?)";
        await pool.execute(sqlImage, [userId])
        

        jwt.sign({userId, username}, jwtSecret, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.cookies('token', token, {sameSite: true, secure: true, httpOnly: true})
                .status(201).json({id: userId});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Database error"});
    }
}

// exports.ConfirmEmail = async (req, res) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: secure_configuration.EMAIL_USERNAME,
//             pass: secure_configuration.PASSWORD
//         }
//     });
//
//     const token = jwt.sign({
//             data: 'Token Data'
//         }, 'ourSecretKey', { expiresIn: '10m' }
//     );
//
//     const mailConfigurations = {
//
//         // It should be a string of sender/server email
//         from: 'mrtwinklesharma@gmail.com',
//
//         to: 'smtwinkle451@gmail.com',
//
//         // Subject of Email
//         subject: 'Email Verification',
//
//         // This would be the text of email body
//         text: `Hi! There, You have recently visited
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:3000/verify/${token}
//            Thanks`
//     };
//
//     transporter.sendMail(mailConfigurations, function(error, info){
//         // if (error) throw Error(error);
//         console.log('Email Sent Successfully');
//         console.log(info);
//     });
// }


exports.UpdateProfile = async (req, res) => {
    console.log("User updated info");
    res.status(200);
}
