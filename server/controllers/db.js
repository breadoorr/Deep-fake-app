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

module.exports = pool;
