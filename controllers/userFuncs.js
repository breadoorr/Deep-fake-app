const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require('pg');
const nodemailer = require('nodemailer');

const db = require("../controllers/db.js");

exports.Login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const sql = "SELECT Username, Password FROM Users WHERE username = ?";
        const [result] = await pool.execute(sql, [username]);

        if (result.length > 0) {
            const user = result[0];
            const passOk = bcrypt.compareSync(password, user.password);
            if (passOk) {
                const userId = user.id;
                jwt.sign({userId, username}, jwtSecret, {expiresIn: '1h'}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {sameSite: 'None', secure: true})
                        .status(201).json({id: userId});
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
    res.cookie('token', '', {sameSite: 'none', secure: true}).json('ok');
}

exports.Register = async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        const [result] = await pool.execute(sql, [username, hashedPassword]);
        const userId = result.insertId;

        jwt.sign({userId, username}, jwtSecret, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {sameSite: 'none', secure: true})
                .status(201).json({id: userId});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Database error"});
    }
}

exports.ConfirmEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: secure_configuration.EMAIL_USERNAME,
            pass: secure_configuration.PASSWORD
        }
    });

    const token = jwt.sign({
            data: 'Token Data'  .
        }, 'ourSecretKey', { expiresIn: '10m' }
    );

    const mailConfigurations = {

        // It should be a string of sender/server email
        from: 'mrtwinklesharma@gmail.com',

        to: 'smtwinkle451@gmail.com',

        // Subject of Email
        subject: 'Email Verification',

        // This would be the text of email body
        text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/verify/${token} 
           Thanks`
    };

    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}

exports.GetProfile = async (req, res) => {
    // res.json(members.filter(member => member.email === req.params.email));
    const sql = "SELECT * FROM Users WHERE username = req";
    const email = req.params.email;

    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

exports.UpdateProfile = async (req, res) => {
    console.log("User updated info");
    res.status(200);
}
