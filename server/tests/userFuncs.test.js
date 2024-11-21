// supertest is used for testing node.js
const request = require('supertest');
const express = require('express');
// bodyparser which proccesses incoming requests, useful for HTTP files
const bodyParser = require('body-parser');
// our path to db.js file
const { pool } = require('../controller/db'); 
// path to file where we have Login and Register funcs
const { Login, Register, Logout } = require('../controller/userFuncs'); 

const app = express();
// parsing JSON request bodies
app.use(bodyParser.json()); 

// mocking (simulating) routes for testing
app.post('/login', Login);
app.post('/register', Register);
app.post('/logout', Logout);

// mocking database for testing
jest.mock('../controller/db', () => ({
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

    expect(response.status).toBe(201);
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

    expect(response.status).toBe(401);
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

    expect(response.status).toBe(401);
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

    expect(response.status).toBe(201);
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

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });

  // testing the logout route
  test('should logout successfully', async () => {
    const response = await request(app).post('/logout');

    expect(response.status).toBe(200);
    expect(response.body).toBe('ok');
  });

  // will create tests for getprofile and other functs once they are gonna be done
  // to be continued

});
