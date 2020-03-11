
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { auth } = require('../../config.json');
const { Unauthorized } = require('../exceptions');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: auth.secretKey,
    expiresIn: auth.expiresIn,
};

const strategy = new Strategy(opts, async (jwtPayload, done)=> {
        console.log('Strategy definition');
        const user = await usersService.findOneById(jwtPayload.id);
        user ? done(null, user) : done(new Unauthorized(e.message), false);
});

passport.use(strategy);
