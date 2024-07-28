import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.mjs';

export const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send('User is not authorized');
        } else {
            next();
        }
    });
}

export const getUser = req => {
    if (!req.headers.authorization) {
        return null;
    }

    const user = jwt.decode(req.headers.authorization, JWT_SECRET);

    if (!user) {
        return null;
    }

    return user;
}