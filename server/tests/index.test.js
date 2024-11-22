// importing supertest for testing HTTP requests
const request = require("supertest"); 
// importing the index for testing
const server = require("../index"); 

describe("Testing Express Server", () => {
    // testing the root route for a welcome message
    test("GET / should return a welcome message", async () => {
        const response = await request(server).get("/"); // sending a GET request to the root route
        expect(response.statusCode).toBe(200); // checking the status code is 200
        expect(response.text).toBe("Welcome to root URL of Server"); // checking the response text
    });

    // testing the /user route for a 404 response when not implemented
    test("GET /user should return 404 if route is not implemented", async () => {
        const response = await request(server).get("/user"); // sending a GET request to the /user route
        expect(response.statusCode).toBe(404); // checking the status code is 404
    });

    // testing the /game route for a 404 response when not implemented
    test("GET /game should return 404 if route is not implemented", async () => {
        const response = await request(server).get("/game"); // sending a GET request to the /game route
        expect(response.statusCode).toBe(404); // checking the status code is 404
    });

    // closing the server after completing all tests
    afterAll((done) => {
        server.close(done); // shutting down the server to free the port
    });
});
