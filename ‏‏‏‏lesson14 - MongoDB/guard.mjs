export const guard = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('User is not authorized');
    }
}