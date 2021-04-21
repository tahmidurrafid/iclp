const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : '103.147.182.74',
    user : 'amtrafid_DB',
    password : 'testdb1234ICPC',
    database : 'amtrafid_ICLP'
});
// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'testdbnode'
// });

db.connect( (err) => {
    if(err){
        console.log("Error occurred" + err);
    }else{
        console.log("Connection Successfull");
        // db.query("CREATE TABLE MyGuests ( " +
        //     "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, " + 
        //     "firstname VARCHAR(30) NOT NULL, " +
        //     "lastname VARCHAR(30) NOT NULL, " + 
        //     "email VARCHAR(50), " + 
        //     "reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)");
    }
})

module.exports = db;