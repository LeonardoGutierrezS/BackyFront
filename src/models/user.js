const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rut: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{1,2}\.\d{3}\.\d{3}-\d{1,2}$/, 'El formato del rut no es válido.'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'brigadista'],
    default: 'brigadista',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;