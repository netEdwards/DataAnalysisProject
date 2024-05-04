const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();



passport.use(new LocalStrategy(
    async function(username, password, done) {
        console.log('Username:', username);
        console.log('Password:', password);
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.key, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        } catch (err) {
            return done(err);
        }
    }
));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET // replace with your own secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log('Payload:', jwt_payload)
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id }, opts.secretOrKey, { expiresIn: '1h' });
};

module.exports = {
    passport,
    generateToken
};