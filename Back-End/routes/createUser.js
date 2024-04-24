const registerRoute = require('express').Router();
const mg = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();


registerRoute.post('/register', async (req, res) => {
    try{
        mg.connect(process.env.MONGO_URI);
        const hashedPassword = await bcrypt.hash(req.body.key, 10);
        const newUser = new User({
            username: req.body.username,
            key: hashedPassword,
            role: req.body.role
        });
        await newUser.save();
        res.status(201).send('User created');
    }catch (error) {
        console.error('Failed to create user', error);
        res.status(500).send('Error creating user');
    }
});

module.exports = registerRoute;
