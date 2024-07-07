import express from 'express';
import cors from 'cors';
export const app = express();

app.listen(4444, () => {
    console.log("Server is running on port 4444");
});

app.get("/", (req, res) => {
    res.send({
        message: "Hello world!",
    });
});

import('./handlers/files.mjs');