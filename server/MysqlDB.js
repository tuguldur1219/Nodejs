const { connect } = require('mongoose');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    database: 'nodejs',
    user: 'root',
    password: 'god12191219'
});

connection.connect(function(error){
    if(error)
    {
        throw error;
    }
    else 
    {
        console.log("MySQL Database is connected successfully");
    }
});
module.exports = connection;