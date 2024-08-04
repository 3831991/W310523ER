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

export const bussinessGuard = (req, res, next) => {
    const user = getUser(req);
console.log(user)
    if (user?.isBussiness || user?.isAdmin) {
        next();
    } else {
        res.status(401).send('User is not authorized');
    }
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