const io = require("socket.io-client")
const socket = io("ws://localhost:3000");

function printFn(){

    const arr = [];

    return new Promise((result, error) =>{
        socket.on("mod_forecast", (data) => {
            return new Promise((response, error) =>{
                let x = "Hello world";
                let message= "successful";
                arr.push({
                    message: message,
                    value: x,
                    on: data
                })
                console.log("arr2:", arr);

                response({info: true, data: arr});
            }).then((resultado) =>{
                result(resultado)
            });
        });
    
    }).then((result) =>{
        if(result.info){
            console.log("arr1:", result.data[0]);
            return arr[0];
        }
        
    });
    
}

module.exports = {printFn}