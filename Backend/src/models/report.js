const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    idImplemento: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    observaciones: {
        type: String, // Assuming 'observaciones' is of type String, change it accordingly if it's a different type
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
