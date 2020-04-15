'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const UserDataService = require('./userDataService');

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserDataService.getUserById(id)
        .then(user => done(false, user))
        .catch(err => done(err, null));
});

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = global.gConfig ? global.gConfig.jwt_secret : 'CriteriumSecretJWT';

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    UserDataService.getUserById(payload.id, true)
        .then(user => done(false, user))
        .catch(err => done(err, null));
}));

const tokenAuth = passport.authenticate('jwt');
const optionalTokenAuth = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        req.user = user;
        return next();
    })(req, res, next);
}

const generateToken = (payload) => jwt.sign(payload, jwtOptions.secretOrKey);
const generateUserToken = (user) => ({
    token: generateToken({
        id: user.id,
        email: user.email
    })
});

module.exports = {
    passport,
    generateToken,
    generateUserToken,
    middlewares: {
        optionalTokenAuth,
        tokenAuth
    }
}
