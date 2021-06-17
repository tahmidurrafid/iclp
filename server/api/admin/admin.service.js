const db = require('../../db/index');

module.exports = {
    categories : (data, callback) => {
        db.query(`SELECT * FROM category`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    deleteCategory: (data, callback)=>{
        db.query(`DELETE FROM category WHERE id=${data.id}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )

    },
    addCategory: (data, callback)=>{
        db.query(`INSERT INTO category(value) VALUES('${data}')`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )

    },
    updateCategory: (data, callback)=>{
        db.query(`UPDATE category SET value='${data.name}' WHERE id=${data.id}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )

    },
    games : (data, callback) => {
        db.query(`SELECT * FROM game`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    updateGame: (data, callback)=>{
        db.query(`UPDATE game SET gameName='${data.name}' WHERE id=${data.id}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )

    },
    deleteGame: (data, callback)=>{
        db.query(`DELETE FROM game WHERE id=${data.id}`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )

    },
}