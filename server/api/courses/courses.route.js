const router = require("express").Router();
const courses = require("./courses.controller");
const {checkToken} = require("../../auth/token");

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

router.get('/', courses.getAll);
router.get('/categories', courses.categories);
router.get('/:id', courses.get);
router.post('/create', checkToken, courses.create);
router.post('/test', (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const [firstFileName] = Object.keys(files);
        
        let oldPath = files[firstFileName].path;
        console.log(oldPath);
        var newPath = path.join("storage", 'uploads') + '/' + files[firstFileName].name;

        var rawData = fs.readFileSync(oldPath)
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
        })

        res.json({ filename: firstFileName });
    });

});

module.exports = router