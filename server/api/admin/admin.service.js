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
}