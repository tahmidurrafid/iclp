const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'testdbnode'
});

db.connect( (err) => {
    if(err){
        console.log("Error occurred" + err);
    }else{
    }
})

module.exports = db;