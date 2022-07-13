const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const mysqlCon = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});
mysqlCon.connect(err=>{
    if(err) throw err
    console.log('mysql Connected')
});

module.exports = mysqlCon;