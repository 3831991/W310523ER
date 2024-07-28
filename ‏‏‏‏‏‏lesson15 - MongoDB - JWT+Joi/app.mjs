import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/full-stack-W310523ER');
    console.log('mongodb connection established on port 27017');
}

main().catch(err => console.log(err));

export const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

app.listen(8989, () => {
    console.log('listening on port 8989');
});

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to MongoDB!",
    });
});

import("./handlers/users/users.mjs");
import("./handlers/users/auth.mjs");