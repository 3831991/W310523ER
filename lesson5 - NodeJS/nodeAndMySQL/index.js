const express = require('express');
const mysql = require('mysql2');
const app = express();

// יצירת הגדרות החיבור למסד הנתונים
const con = mysql.createConnection({
    host: 'localhost',
    // port: 8889, // למחשבי Mac
    user: 'root',
    password: '',
    database: 'full-stack-w310523er',
});

// התחברות למסד הנתונים
con.connect(err => {
    if (err) {
        throw err;
    }

    console.log('Connecting to mysql');
});

// הפעלת השרת והאזנה לפורט הנבחר
app.listen(5000, () => {
    console.log('listening on port 5000');
});

app.get('/', (req, res) => {
    res.send({
        hello: 'Hello world!',
    });
});

app.get("/students", (req, res) => {
    con.query("SELECT * FROM students", (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result);
    });
});