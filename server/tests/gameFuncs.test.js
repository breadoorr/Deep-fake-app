// GetPictures is not working, received 500 -> database error
// FinishGame is not working

const { GetLevelTutorial, GetLevelClassic, GetLevelTimeLim, GetLevelInfinite, GetPictures, Answer, FinishGame } = require('../controllers/gameFuncs');
const { db: pool } = require('../controllers/db');

// Mocking the `pool.execute` method to simulate database queries
jest.mock('../controllers/db', () => ({
    db: {
        execute: jest.fn()
    }
}));

beforeEach(() => {
    // Mocking console.log
    console.log = jest.fn();
    pool.execute.mockReset(); // Reset the mock before each test
});

describe('gameFuncs controller tests', () => {
    test('GetLevelTutorial should return a 200 status and log a message', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await GetLevelTutorial(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Tutorial Started');
    });

    test('GetLevelClassic should return a 200 status and log a message', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await GetLevelClassic(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Game Started');
    });

    test('GetLevelTimeLim should return a 200 status and log a message', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await GetLevelTimeLim(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Game Started with a timer');
    });

    test('GetLevelInfinite should return a 200 status and log a message', async () => {
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await GetLevelInfinite(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Game Started with a timer');
    });

    test('GetPictures should return pictures and update variables when pictureNumber is less than picturesAmount', async () => {
        const req = { body: 1 };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        // mocking successful database call
        pool.execute.mockResolvedValueOnce([[{ image_data: Buffer.from('fake data') }]]);

        await GetPictures(req, res);

        expect(pool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM Pictures'), [req]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));  // Mock image data or response
    });

    test('Answer should process the answer and return status 200', async () => {
        const req = { body: 'fake' }; // Simulating the "fake" answer
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await Answer(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Process answer');
    });

    test('FinishGame should update the game results in the database', async () => {
        const req = { body: {}, username: 'testuser' };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        pool.execute.mockResolvedValueOnce([[10, 50, 5]]);  // Mocking a user result from DB

        await FinishGame(req, res);

        expect(pool.execute).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE Users SET'),
            expect.any(Array)  // mocked values passed to the query (escaped data)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(console.log).toHaveBeenCalledWith('Process endgame results');
    });
});
