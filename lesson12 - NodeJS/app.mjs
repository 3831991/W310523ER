import express from 'express';
import cors from 'cors';
import fs, { fdatasync } from 'fs';
import moment from 'moment';

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.use((req, res, next) => {
    // יצרנו שם דינאמי לקובץ הלוגים, ע"מ שכל יום יהיה קובץ אחר
    const fileName = 'log_' + moment().format("YYYY_MM_DD");
    let fileContent = '';

    fileContent += `Method: ${req.method}\n`;
    fileContent += `Route: ${req.url}\n`;
    fileContent += `Time: ${moment().format("DD/MM/YYYY HH:mm:ss")}\n`;

    // אם לא קיימת תיקייה של לוגים - הוא מייצר אותה
    fs.mkdirSync('./logs', { recursive: true });

    // אם אין את הקובץ הוא מייצר אותו, אחרת - הוא מוסיף אליו את התוכן
    fs.appendFile(`./logs/${fileName}.txt`, fileContent + '\n', err => {});

    // עובר ל-MiddleWare הבא
    next();
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});

app.get('/', (req, res) => {
    res.send("Welcome!");
});
