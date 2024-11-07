const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "https://vesta.uclan.ac.uk/phpmyadmin/index.php?route=/",
    user: "iiambarshev",
    password: "y3D58mH4j6",
    database: "iiambarshev"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;