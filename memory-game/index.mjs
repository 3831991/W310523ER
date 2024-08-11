import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const app = express();

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));

app.use(express.static("frontend"));

app.listen(1234, () => {
    console.log("Server is running on port 1234");
});

app.get("/images", (req, res) => {
    fs.readdir(`./images`, (err, files) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        res.send(files);
    });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/images/:fileName", (req, res) => {
    const url = `${__dirname}/images/${req.params.fileName}`;
    res.sendFile(path.resolve(url));
});