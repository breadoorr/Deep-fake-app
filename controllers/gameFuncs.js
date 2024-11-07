exports.GetLevel = async (req, res) => {
    console.log("Picture received");
    res.status(200);
}

exports.Answer = async (req, res) => {
    console.log("Process answer");
    res.status(200);
}

exports.FinishGame = async (req, res) => {
    console.log("Process endgame results");
    res.status(200);
}

