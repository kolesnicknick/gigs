const passport = require('passport');

module.exports = (req, res, next) => {
    const authMiddleWare = passport.authenticate('jwt', {session: false}, (err, user) => {
        if (!user) { next(err) } else {
            req.user = user;
            next();
        }
    });
    authMiddleWare(req, res, next);
};
