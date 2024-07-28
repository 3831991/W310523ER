export const guard = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('User is not authorized');
    }
}

// export const bussinesGuard = (req, res, next) => {
//     if (req.session.user?.isBussines) {
//         next();
//     } else {
//         res.status(401).send('User is not authorized');
//     }
// }