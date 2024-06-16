const express = require('express');
const mysql = require('mysql2');
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    // port: 8889, // למחשבי Mac
    user: 'root',
    password: '',
    database: 'full-stack-w310523er',
});

con.connect(err => {
    if (err) {
        throw err;
    }

    console.log('Connecting to mysql');
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});

app.get('/', (req, res) => {
    res.send({
        hello: 'Hello world!',
    });
});