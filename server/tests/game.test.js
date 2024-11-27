// WORKING CORRECTLY!

// importing all the needed modules for testing
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const gameRouter = require('../routers/game'); 

// mocking the game functions
jest.mock('../controllers/gameFuncs.js', () => ({
    GetLevelTutorial: jest.fn((req, res) => res.status(200).json({ message: 'Tutorial started' })),
    GetLevelClassic: jest.fn((req, res) => res.status(200).json({ message: 'Classic game started' })),
    GetLevelTimeLim: jest.fn((req, res) => res.status(200).json({ message: 'Time-limited game started' })),
    GetLevelInfinite: jest.fn((req, res) => res.status(200).json({ message: 'Infinite game started' })),
    GetPictures: jest.fn((req, res) => res.status(200).json({ picture: 'fake-picture' })),
    Answer: jest.fn((req, res) => res.status(200).json({ result: 'answer processed' })),
    FinishGame: jest.fn((req, res) => res.status(200).json({ result: 'game finished' })),
}));

describe('Game Routes', () => {
    let app;

    beforeEach(() => {
        jest.clearAllMocks(); // clearing any previous mock calls
        app = express();
        app.use(cors());
        app.use('/game', gameRouter); // using the game router for routes starting with /game
    });

    test('POST /game/startTutorial should call GetLevelTutorial', async () => {
        const mockGetLevelTutorial = require('../controllers/gameFuncs.js').GetLevelTutorial;

        await request(app)
            .post('/game/startTutorial')
            .expect(200);

        expect(mockGetLevelTutorial).toHaveBeenCalled();
    });

    test('POST /game/startClassic should call GetLevelClassic', async () => {
        const mockGetLevelClassic = require('../controllers/gameFuncs.js').GetLevelClassic;

        await request(app)
            .post('/game/startClassic')
            .expect(200);

        expect(mockGetLevelClassic).toHaveBeenCalled();
    });

    test('POST /game/startTimeLimited should call GetLevelTimeLim', async () => {
        const mockGetLevelTimeLim = require('../controllers/gameFuncs.js').GetLevelTimeLim;

        await request(app)
            .post('/game/startTimeLimited')
            .expect(200);

        expect(mockGetLevelTimeLim).toHaveBeenCalled();
    });

    test('POST /game/startInfinite should call GetLevelInfinite', async () => {
        const mockGetLevelInfinite = require('../controllers/gameFuncs.js').GetLevelInfinite;

        await request(app)
            .post('/game/startInfinite')
            .expect(200);

        expect(mockGetLevelInfinite).toHaveBeenCalled();
    });

    test('POST /game/getPicture should call GetPictures', async () => {
        const mockGetPictures = require('../controllers/gameFuncs.js').GetPictures;

        await request(app)
            .post('/game/getPicture')
            .send({ body: 1 })
            .expect(200);

        expect(mockGetPictures).toHaveBeenCalled();
    });

    test('POST /game/answer should call Answer', async () => {
        const mockAnswer = require('../controllers/gameFuncs.js').Answer;

        await request(app)
            .post('/game/answer')
            .send({ body: 'fake' })
            .expect(200);

        expect(mockAnswer).toHaveBeenCalled();
    });

    test('PUT /game/end should call FinishGame', async () => {
        const mockFinishGame = require('../controllers/gameFuncs.js').FinishGame;

        await request(app)
            .put('/game/end')
            .expect(200);

        expect(mockFinishGame).toHaveBeenCalled();
    });

    test('GET /game should return the game page message', async () => {
        await request(app)
            .get('/game/')
            .expect(200)
            .expect('This is the game page request');
    });
});
