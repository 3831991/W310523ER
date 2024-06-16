// ייבוא האקספרס
const express = require('express');

// שימוש באקספרס
const app = express();

// הפעלת השרת (והגדרת הפורט)
app.listen(3875, () => {
    console.log('listening on port 3875');
});

// יירוט הבקשה
// כשפונים לשרת ב-GET
// ולא מוסיחפים ניתוב מיוחד
app.get('/', (req, res) => {
    res.send({
        message: "Hello world!",
    });
});

// יירוט הבקשה
// כשפונים לשרת ב-GET
// ויש ניתוב ל-students
app.get('/students', (req, res) => {
    res.send([
        { firstName: 'John', lastName: 'John' },
        { firstName: 'John', lastName: 'John' },
        { firstName: 'John', lastName: 'John' },
        { firstName: 'John', lastName: 'John' },
    ]);
});

// כנ"ל
app.get('/test', (req, res) => {
    res.send({
        message: "Hello world 2",
    });
});