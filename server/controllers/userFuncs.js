const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetPictures } = require('./gameFuncs')

// const {pool} = require('');

const { pool } = require("./db");

const nodemailer = require('nodemailer');

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

exports.GetImage = async (userId) => {
    try {
        const imageSearchQuery = "SELECT ImageFake FROM ImageInfo WHERE ImageID = ?";
        const [imageResult] = await pool.execute(imageSearchQuery, [userId])

        const image = imageResult[0].ImageFake;
        // console.log(image);
        return image;
    } catch(err) {
        console.log(err);
    }
}


exports.GetProfile = async (req, res) => {
    const userId = req.body.userId;
    try {
        const sql = "SELECT * FROM UserInfo WHERE UserID = ?";
        const [result] = await pool.execute(sql, [userId]);

        res.status(200).json({user: result});
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

                const image = this.GetImage(userId);
                jwt.sign({userId, username}, jwtSecret, {expiresIn: '1d'}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {sameSite: "none", secure: true});
                    res.status(201).json({user: user, image: image});
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
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const sql = "INSERT INTO UserInfo (Username, Password, Email) VALUES (?, ?, ?)";
        const [result] = await pool.execute(sql, [username, hashedPassword, email]);
        const userId = result.insertId;

        const image = this.GetImage(userId);

        res.status(200).json({user: { id: userId, username: username }, image: image});
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
