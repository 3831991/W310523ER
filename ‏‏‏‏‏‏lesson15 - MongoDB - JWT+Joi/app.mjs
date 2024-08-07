import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import morgan from 'morgan';
import moment from 'moment';

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('mongodb connection established on port 27017');
}

main().catch(err => console.log(err));

export const app = express();

app.use(express.json());

// כל הלוג בשורה אחת (Morgan)
// app.use(morgan(':method :url :status :date[iso] :response-time ms'));

// לוג מותאם אישית (Morgan)
// שילבנו כאן לוג צבעוני (Chalk)
app.use(morgan((tokens, req, res) => {
    const status = tokens.status(req, res);

    return [
        chalk.blue(tokens.method(req, res)),
        chalk.green(tokens.url(req, res)),
        status >= 200 && status < 400 ? chalk.bgGreen(tokens.status(req, res)) : chalk.bgRed(tokens.status(req, res)),
        chalk.gray(moment().format("YYYY-MM-DD HH:mm")),
        chalk.bgBlack(tokens['response-time'](req, res), 'ms'),
    ].join(' ')
}));

app.use(express.static("public"));

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.listen(process.env.PORT, () => {
    console.log('listening on port 8989');
});

// שימוש בספרייה Chalk
// app.use((req, res, next) => {
//     const user = getUser(req);
//     console.log(chalk.red("userId: ") + chalk.blue.bold(user?._id));

//     console.log(chalk.bgBlue(req.method));
//     console.log(chalk.green(req.url));

//     next();
// });

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to MongoDB!",
    });
});

// שמנו את זה בפונקציה אסינכורנית בכדי לייבא בצורה סינכרונית
// ע"מ שהקובץ של שגיאה 404 ייטען רק לאחר שיבדוק את כל הניתובים
(async () => {
    await import("./handlers/users/users.mjs");
    await import("./handlers/users/auth.mjs");
    await import("./handlers/cards/cards.mjs");
    await import("./initial-data/initial-data.service.mjs");

    app.get("*", (req, res) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<meta charset="UTF-8">`);
        res.write(`
            <style>
                * {
                    direction: rtl;
                    text-align: center;
                    color: red;
                }
            </style>
        `);
        res.write("<h1>שגיאה 404</h1>");
        res.write("<h2>הדף המבוקש לא נמצא</h2>");
        res.end();
    });
})()
