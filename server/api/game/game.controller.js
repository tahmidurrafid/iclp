const gameService = require("./game.service");
const formidable = require('formidable');
const { response } = require("express");
module.exports={
    creategame: (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.send("error");
            }
            let data={};
            data.files=files;
            data.fields=fields;
            gameService.uploadGame(data, (err, results) => {
                if (err) {
                    return res.send("error");
                } else {
                    
                    return res.json(results);
                }
            });
        });
    },
    allgames:(req,response)=>{
        gameService.allGames(req, (err, results) => {
            if (err) {
                response.send("error");
            } else {
                
                response.json(results);
            }
        })

    }
}