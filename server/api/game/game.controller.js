const gameService = require("./game.service");
const formidable = require('formidable');
module.exports={
    creategame: (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let data={};
            data.files=files;
            data.fields=fields;
            gameService.uploadGame(data, (err, results) => {
                if (err) {
                    res.send("Error ase");
                } else {
                    
                    res.json(results);
                }
            });
        });
    },
}