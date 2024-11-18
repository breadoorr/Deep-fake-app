const mysql = require('mysql2');
const {createPool} = require("mysql2");

exports.db = async () => {
    try{
        const pool = await mysql.createPool({
            host: "https://vesta.uclan.ac.uk",
            user: "iiambarshev",
            password: "y3D58mH4j6",
            database: "iiambarshev"
        });

        console.log("connected to db");
    } catch (err) {
        console.log(err);
    }
}