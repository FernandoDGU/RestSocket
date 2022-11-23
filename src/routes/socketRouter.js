const {Router} = require("express");

function socketRouter(io) {
    const router = Router();

    router.post("/forecast", (req, res) => {
        console.log(req.body);
        const count = req.body.count;
        if(!count) {
            res.status(400).json({message: "Data not found"});
        }

        io.emit("mod_forecast", count);
        res.status(200).json({message: "successful delivered"});
    });

    return {
        router,
    };
}


module.exports = socketRouter