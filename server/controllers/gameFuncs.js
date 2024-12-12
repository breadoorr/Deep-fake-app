const { pool } = require("./db");

// Block of constants to support different game modes
const defPicAmount = 10; // Max amount of picture pairs in a level

// Block of variables to keep track of the game process
let gameMode = 0;      // For several game modes functionality
let gameScore = 0;     // In-game score

// Pull a pair of pictures from a DB
exports.GetPictures = async (req, res) => {
    try {
        const sql1 = "SELECT ImageReal, ImageFake FROM ImageInfo LIMIT 1000";
        let [result] = await pool.execute(sql1);

        // Separate into two arrays: one for real images and one for fake images
        const realImages = result.map(row => ({ ImageReal: row.ImageReal }));
        const fakeImages = result.map(row => ({ ImageFake: row.ImageFake }));

        res.status(200).json({ real: realImages, fake: fakeImages });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({ error: 'Error fetching photos' });
    }
};



// Game results processing
exports.FinishGame = async (req, res) => {
    const { userId, score, pageNum} = req.body;
    try {
        const sql = "SELECT TotalScore, TotalQuestions, GamesPlayed FROM UserInfo WHERE UserID=?";
        const [result] = await pool.execute(sql, [userId]);

        if (result.length > 0) {
            const totalScore = result[0].TotalScore + score;
            const totalQuestions = result[0].TotalQuestions + pageNum;
            const gamesPlayed = result[0].GamesPlayed + 1;

            const sql1 = `
                UPDATE UserInfo
                SET TotalScore = ?, TotalQuestions = ?, GamesPlayed = ?
                WHERE UserID = ?
            `;
            await pool.execute(sql1, [totalScore, totalQuestions, gamesPlayed, userId]);
            console.log("User data updated successfully.");
            res.status(200);
        } else {
            console.error("User not found.");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
}

