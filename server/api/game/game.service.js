const db = require('../../db/index');
const fs = require('fs');
module.exports = {
    uploadGame : (data, callback) => {
        db.query(`SELECT MAX(id) as max FROM game`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                else{
                let id=""
                Object.keys(results).forEach(function(key) {
                    var row = results[key];
                   if(row.max){
                       id=row.max+1;
                   }
                   else{
                       id=0
                   }
                  });
                fs.copyFile(data.files.pic.path, 'storage/Games/cover'+id+'.jpg', (err) => {
                    if (err) throw err;
                });
                fs.copyFile(data.files.file.path, 'storage/Games/file'+id+'.html', (err) => {
                    if (err) throw err;
                });
                piclocation='storage/Games/cover'+id+'.jpg';
                filelocation='storage/Games/file'+id+'.html'
                db.query(`insert into game(gameName,filePath,details,coverPic) values('${data.fields.title}','${filelocation}','${data.fields.description}','${piclocation}')`,
                (error, results, fields) => {
                    if(error){
                        return callback(error);
                    }
                }
                );
            }
        }
        )
    }
}