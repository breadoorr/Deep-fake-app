// WORKING CORRECTLY!

// mocking the db module
jest.mock('../controllers/db', () => ({
    db: jest.fn().mockResolvedValue('Mock DB connected'), // mocking async db function
  }));

// importing supertest for testing http requests
const request = require("supertest"); 
// importing the index for testing
const server = require("../index");

describe("testing express server", () => {
    // testing the root route for a welcome message
    test("GET / should return a welcome message", async () => {
        const response = await request(server).get("/"); // sending a get request to the root route
        expect(response.statusCode).toBe(200); // checking the status code
        expect(response.body).toEqual({ message: "Welcome to root URL of Server" }); // checking the response content
    });

    // testing the /user route for a 200 response
    test("GET /user should return 200 if route is implemented", async () => {
        const response = await request(server).get("/user"); // sending a get request to the /user route
        expect(response.statusCode).toBe(200); // checking the status code
    });

    // testing the /game route for a 200 response
    test("GET /game should return 200 if route is implemented", async () => {
        const response = await request(server).get("/game"); // sending a get request to the /game route
        expect(response.statusCode).toBe(200); // checking the status code
    });

    // closing the server after all tests
    afterAll((done) => {
        server.close(done); // shutting down the server to free the port
    });
});
