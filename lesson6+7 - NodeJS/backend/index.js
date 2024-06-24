const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
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

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));

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

app.get("/students/average", (req, res) => {
    con.query(`
        SELECT
            s.id,
            s.firstName,
            s.lastName,
            AVG(tg.grade) AS average
        FROM
            students AS s
        LEFT JOIN test_grades AS tg
        ON
            tg.studentId = s.id
        GROUP BY
            s.id
    `, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result);
    });
});

app.get("/students/average-by-cites", (req, res) => {
    con.query(`
        SELECT
            s.city,
            AVG(tg.grade) AS AVG
        FROM
            students AS s
        LEFT JOIN test_grades AS tg
        ON
            tg.studentId = s.id
        GROUP BY
            s.city
    `, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result);
    });
});

app.get("/students/:id", (req, res) => {
    const { id } = req.params;

    con.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
        if (err) {
            throw err;
        }

        const user = result.pop();

        con.query("SELECT test_grades.id, tests.name, test_grades.grade FROM test_grades LEFT JOIN tests ON tests.id = test_grades.testId WHERE test_grades.studentId = ?", [id], (err, grades) => {
            if (err) {
                throw err;
            }
    
            res.send({
                user,
                grades
            });
        });
    });
});