// require express file because we use express.js
const express = require("express");
// require db.js file
const { db } = require("../controllers/db");

// this is the instance for express app
const app = express();
// port where the server will run
const PORT = 3000;

// route to test the database connection
app.get("/db-check", async (req, res) => {
    try {
        // calling the db function from db.js to test the connection
        await db(); 
        // if status is 200 -> connected
        res.status(200).send("Database connected successfully!"); 
    } catch (error) {
        // if there is an error, return error
        res.status(500).send("Database connection failed: " + error.message);
    }
});

// basic route to test if the server is running
app.get("/", (req, res) => {
    // response for the root route
    res.send("Hello! Test server is running."); 
});

// starting the server and listening on the needed port
app.listen(PORT, () => {
    // logging the server URL for easy access
    console.log(`Server is running on http://localhost:${PORT}`); 
});