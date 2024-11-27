// has issues, need to fix userFuncs.js

// supertest is used for testing node.js
const request = require('supertest');
const express = require('express');
// bodyparser which processes incoming requests, useful for HTTP files
const bodyParser = require('body-parser');
// our path to db.js file
const { pool } = require('../controllers/db'); 
// path to file where we have Login and Register funcs
const { Login, Register, Logout } = require('../controllers/userFuncs'); 

const app = express();
// parsing JSON request bodies
app.use(bodyParser.json()); 

// mocking (simulating) routes for testing
app.post('/login', Login);
app.post('/register', Register);
app.post('/logout', Logout);

// mocking database for testing
jest.mock('../controllers/db', () => ({
  pool: {
    execute: jest.fn()
  }
}));

describe('Auth API', () => {

  // mocking data to simulate successful login and registration
  const mockUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'hashedPassword'
  };

  beforeEach(() => {
    // resetting the mock database behavior before each test
    pool.execute.mockReset();
  });

  // testing the Login route
  test('should login successfully with valid credentials', async () => {
    pool.execute.mockResolvedValueOnce([{ username: mockUser.username, password: mockUser.password, id: 1 }]);

    const response = await request(app)
      .post('/login')
      .send({
        username: mockUser.username,
        password: 'hashedPassword'
      });

    expect(response.status).toBe(200); // changed to 200 for successful login
    expect(response.body.id).toBe(1);
  });

  test('should fail login with invalid username', async () => {
    pool.execute.mockResolvedValueOnce([]);

    const response = await request(app)
      .post('/login')
      .send({
        username: 'wronguser',
        password: 'password'
      });

    expect(response.status).toBe(401); // checking for 401 instead of 500
    expect(response.body.message).toBe('Invalid username');
  });

  test('should fail login with invalid password', async () => {
    pool.execute.mockResolvedValueOnce([{ username: mockUser.username, password: 'wrongPassword', id: 1 }]);

    const response = await request(app)
      .post('/login')
      .send({
        username: mockUser.username,
        password: 'wrongPassword'
      });

    expect(response.status).toBe(401); // expect 401 for invalid password
    expect(response.body.message).toBe('Invalid password');
  });

  // testing the register route
  test('should register successfully with valid data', async () => {
    pool.execute.mockResolvedValueOnce([{ insertId: 1 }]);

    const response = await request(app)
      .post('/register')
      .send({
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedPassword'
      });

    expect(response.status).toBe(201); // status 201 for successful registration
    expect(response.body.id).toBe(1);
  });

  test('should fail register with existing username', async () => {
    pool.execute.mockResolvedValueOnce([{ username: mockUser.username }]);

    const response = await request(app)
      .post('/register')
      .send({
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedPassword'
      });

    expect(response.status).toBe(409); // changed to 409 (conflict) for existing username
    expect(response.body.message).toBe('Username already exists');
  });

  // testing the logout route
  test('should logout successfully', async () => {
    const response = await request(app).post('/logout');

    expect(response.status).toBe(200);
    expect(response.body).toBe('ok');
  });

  // will fix and create tests for getprofile and other functions once they are implemented
  // to be continued

});
