const db = require('../../db/index');

module.exports = {
    create : (data, callback) => {
        db.query(`insert into user(name, email, password, dateofbirth, phone, country, address, type) 
                Values(?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.name, data.email, data.password, data.dateofbirth, data.phone, data.country, data.address,
            data.instructor ? 'instructor': 'user' ],
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
                if(error){
                    return callback(error);
                }else{
                    return callback(null, results);
                }
            }
        )
    },
    getAll : (data, callback) => {
        db.query(`SELECT * FROM user`,
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