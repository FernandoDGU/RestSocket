const {Router} = require("express");
// const io = require("socket.io")
const test = require("../Controllers/printFunction");

function socketRouter(io) {
    const router = Router();

    router.post("/forecast", (req, res) => {
        // console.log(req.body);
        const count = req.body.count;
        if(!count) {
            res.status(400).json({message: "Data not found"});
        }

        io.emit("mod_forecast", count);

        
        return new Promise ((result, error) => {
            const x = test.printFn();
            result(x);
        }).then((x) =>{
            console.log(x.message);
            res.status(200).json({message: x});
        });
        // console.log(x.message);
        //     res.status(200).json({message: x});
    });

    return {
        router,
    };

}

module.exports = socketRouter