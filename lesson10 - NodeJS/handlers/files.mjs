import { app } from "../app.mjs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/files", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        res.send(files);
    });
});

app.get("/files/:fileName", (req, res) => {
    const url = `${__dirname}/../files/${req.params.fileName}`;
    res.sendFile(path.resolve(url));
});