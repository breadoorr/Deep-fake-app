const mysql = require('mysql2/promise');

// Create and export the database pool
const pool = mysql.createPool({
    host: "db4free.net",
    user: "deepfake_db1",
    password: "DSB1oa_A",
    database: "deepfake_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = async function () {
    try {
        const connection = await pool.getConnection(); // Await the connection
        console.log("Db connected");
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};


module.exports = { pool, db };
