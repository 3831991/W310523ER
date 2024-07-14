import express from 'express';
import cors from 'cors';
export const app = express();

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));

app.use((req, res, next) => {
    console.log(req.method, req.url);

    next();
});

app.listen(4444, () => {
    console.log("Server is running on port 4444");
});

app.get("/", (req, res) => {
    res.send({
        message: "Hello world!",
    });
});

import('./handlers/files.mjs');