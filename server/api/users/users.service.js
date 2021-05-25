const db = require('../../db/index');

module.exports = {
    create : (data, callback) => {
        db.query(`insert into user(name) Values(?)`,
            [data.name],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    get : (data, callback) => {
        db.query(`SELECT * FROM user where id = ?`,
            [data.id],
            (error, results, fields) => {
                console.log(data)
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    getAll : (data, callback) => {
        db.query(`SELECT * FROM MyGuests`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    getUserByEmail : (data, callback) => {
        db.query(
            `SELECT * FROM user where email = ?`,
            [data.email],
            (err, results, fields) => {
                return callback(err, results);
            }
        )
    }
};