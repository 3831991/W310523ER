const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());

// הוספת איטיות בשרת
app.use((req, res, next) => {
    setTimeout(next, 500);
});

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

app.get("/tests", (req, res) => {
    con.query(`
        SELECT
            t.id,
            t.name,
            AVG(tg.grade) AS avg
        FROM
            tests AS t
        LEFT JOIN test_grades AS tg
        ON
            t.id = tg.testId
        GROUP BY
            t.id
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

        con.query("SELECT test_grades.id, tests.id AS testId, tests.name, test_grades.grade FROM test_grades LEFT JOIN tests ON tests.id = test_grades.testId WHERE test_grades.studentId = ?", [id], (err, grades) => {
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

app.put("/students/:studentId", (req, res) => {
    const { studentId } = req.params;
    const grades = req.body;

    for (const g of grades) {
        con.query("UPDATE test_grades SET grade = ? WHERE id = ? AND studentId = ?", [g.grade, g.id, studentId]);
    }
    
    res.end();
});

app.post("/students/test", (req, res) => {
    const { studentId, testId, grade } = req.body;

    con.query("INSERT INTO test_grades(testId, studentId, grade) VALUES (?, ?, ?)", [testId, studentId, grade], (err, result) => {
        if (err) {
            throw err;
        }

        res.send({
            id: result.insertId,
            studentId: +studentId,
            testId: +testId,
            grade: +grade,
        })
    });
});

app.get("/dashboard/students/amount", (req, res) => {
    con.query("SELECT COUNT(*) amount FROM students", (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result[0].amount.toString());
    });
});

app.get("/dashboard/cities/amount", (req, res) => {
    con.query("SELECT COUNT(DISTINCT city) amount FROM students", (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result[0].amount.toString());
    });
});

app.get("/dashboard/tests/amount", (req, res) => {
    con.query("SELECT COUNT(*) amount FROM tests", (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result[0].amount.toString());
    });
});

app.get("/dashboard/tests/avg", (req, res) => {
    con.query("SELECT AVG(grade) avg FROM test_grades", (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result[0].avg.toString());
    });
});

app.get("/dashboard/students/the-best", (req, res) => {
    con.query(`
        SELECT s.firstName, s.lastName, AVG(tg.grade) grade
        FROM test_grades AS tg
        LEFT JOIN students AS s
        ON s.id = tg.studentId
        GROUP BY s.id
        ORDER BY grade DESC LIMIT 1
    `, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result.pop());
    });
});

app.get("/dashboard/cities/the-best", (req, res) => {
    con.query(`
        SELECT s.city, AVG(tg.grade) grade
        FROM test_grades AS tg
        LEFT JOIN students AS s
        ON s.id = tg.studentId
        GROUP BY s.city
        ORDER BY grade DESC LIMIT 1
    `, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result.pop());
    });
});

app.get("/dashboard/students/birthday", (req, res) => {
    con.query(`
        SELECT
            id,
            firstName,
            lastName,
            TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age
        FROM
            students
        WHERE
            MONTH(birthday) = MONTH(CURRENT_DATE);
    `, (err, result) => {
        if (err) {
            throw err;
        }

        res.send(result);
    });
});