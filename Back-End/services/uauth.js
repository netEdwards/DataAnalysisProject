const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }else{
                console.log('User found:', user);
            }
            bcrypt.compare(password, user.key, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }else{
                    console.log('Password match:', isMatch);
                }
                return done(null, user);
            });
        } catch (error) {
            return done(error);
        }
    }
));

// Session
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){ 
    User.findById(id).then((err, user) => {done(err, user)}).catch(err => done(err));
});

