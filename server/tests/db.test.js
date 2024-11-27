// WORKING CORRECTLY!

// require supertest for testing
const request = require("supertest");
// require express file because we use express.js
const express = require("express");
jest.mock("../controllers/db", () => ({
    db: jest.fn(), // mocking db function
}));
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

describe("Testing Express Server Routes", () => {
    // testing the root route for a success message
    test("GET / should return a success message", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello! Test server is running.");
    });

    // mocking a successful DB connection and testing the /db-check route
    test("GET /db-check should return success when DB is connected", async () => {
        db.mockResolvedValueOnce(); // mocking a successful DB connection
        const response = await request(app).get("/db-check");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Database connected successfully!");
    });

    // mocking a failed DB connection and testing the /db-check route
    test("GET /db-check should return error when DB connection fails", async () => {
        db.mockRejectedValueOnce(new Error("Connection error")); // mocking a DB connection failure
        const response = await request(app).get("/db-check");
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe("Database connection failed: Connection error");
    });
});
