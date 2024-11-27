// has issues, need to fix userFuncs.js

// require supertest for testing
const request = require('supertest');
// require express file because we use express.js
const express = require('express');
// import the user router to handle /user routes
const userRouter = require('../routers/user');

// creating an instance of express for testing
const app = express();
// supporting JSON requests
app.use(express.json()); 
// using the user router for routes starting with /user
app.use('/user', userRouter); 

jest.setTimeout(15000); // set a global timeout of 10 seconds for all tests

describe('user routes', () => {

    // test for user registration functionality
    test('post /user/register should call register function', async () => {
        const mockRegister = jest.fn((req, res) => res.status(201).json({ success: true, message: 'User registered!' }));

        // mocking the register function
        jest.spyOn(require('../controllers/userFuncs'), 'Register').mockImplementation(mockRegister);

        // sending a post request to the /user/register route with registration data
        const response = await request(app).post('/user/register').send({
            username: 'newuser1',
            email: 'test1@example.com',
            password: 'password1123',
        });

        // checking if the register function was called and the response was correct
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true, message: 'User registered!' });
        expect(mockRegister).toHaveBeenCalledTimes(1);
    });

    // test for login functionality
    test('post /user/login should call login function', async () => {
        const loginResponse = { success: true, message: 'Logged in!' };
        const mockLogin = jest.fn((req, res) => res.status(201).json(loginResponse));

        // mocking the login function
        jest.spyOn(require('../controllers/userFuncs'), 'Login').mockImplementation(mockLogin);

        // sending a post request to the /user/login route with login data
        const response = await request(app).post('/user/login').send({
            username: 'newuser1',  // Ensure you're logging in with the user that was just registered
            password: 'password1123',
        });

        // checking if the login function was called and the response was correct
        expect(response.status).toBe(201);
        expect(response.body).toEqual(loginResponse);
        expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    // test for logout functionality
    test('get /user/logout should call logout function', async () => {
        const mockLogout = jest.fn((req, res) => res.status(200).send('Logged out!'));

        // mocking the logout function
        jest.spyOn(require('../controllers/userFuncs'), 'Logout').mockImplementation(mockLogout);

        // sending a get request to the /user/logout route
        const response = await request(app).get('/user/logout');

        // checking if the logout function was called and the response was correct
        expect(response.status).toBe(200);
        expect(response.text).toBe('Logged out!');
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    // test for /user/ route, should return welcome message
    test('get /user/ should return welcome message', async () => {
        // sending a get request to the /user/ route
        const response = await request(app).get('/user/');
        // checking if the status code is 200
        expect(response.status).toBe(200); 
        // checking if the correct message is returned
        expect(response.text).toBe('This is the user request'); 
    });

    // test for getting profile information of a user
    test('get /user/getProfile/:username should call getProfile function', async () => {
        const mockGetProfile = jest.fn((req, res) => res.status(200).json({ username: req.params.username }));

        // mocking the getProfile function
        jest.spyOn(require('../controllers/userFuncs'), 'GetProfile').mockImplementation(mockGetProfile);

        // sending a get request to the /user/getProfile/:username route
        const response = await request(app).get('/user/getProfile/newuser');

        // checking if the getProfile function was called and the response was correct
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ username: 'newuser1' });
        expect(mockGetProfile).toHaveBeenCalledTimes(1);
    });

    // test for updating profile information
    test('put /user/updateProfile should call updateProfile function', async () => {
        const mockUpdateProfile = jest.fn((req, res) =>
            res.status(200).json({ success: true, message: 'Profile updated!' })
        );

        // mocking the updateProfile function
        jest.spyOn(require('../controllers/userFuncs'), 'UpdateProfile').mockImplementation(mockUpdateProfile);

        // sending a put request to the /user/updateProfile route with profile data
        const response = await request(app).put('/user/updateProfile').send({
            username: 'newuser1',
            email: 'newemail@example.com',
        });

        // checking if the updateProfile function was called and the response was correct
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, message: 'Profile updated!' });
        expect(mockUpdateProfile).toHaveBeenCalledTimes(1);
    });
});
