const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    body: {
        type: String,
    }

});

const Notes = mongoose.model('Notes', noteSchema, 'notes');
module.exports = Notes;