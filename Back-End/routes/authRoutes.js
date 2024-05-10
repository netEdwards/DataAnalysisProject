const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/uauth');
require('dotenv').config();
const authRoutes = express.Router();

// authRoutes.post('/login', passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

authRoutes.get('/user', (req, res) => {
    res.json({
        username: req.user.username
    })
});

authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(400).json({ message: info.message || 'Invalid username or password' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to login' });
            }
            try {
                const token = generateToken(user);
                return res.json({ user, token });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to generate token' });
            }
        });
    })(req, res, next);
});

authRoutes.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200);
});

authRoutes.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
    console.log('User logged out');
});

module.exports = authRoutes;