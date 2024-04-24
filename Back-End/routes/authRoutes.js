const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authRoutes = express.Router();

// authRoutes.post('/login', passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/login',
//     failureFlash: true
// }));


authRoutes.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

authRoutes.get('/login', (req, res) => {
    res.send('Login page');
});

authRoutes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = authRoutes;