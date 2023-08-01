const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
    rut: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required:false,
    enum: ['admin', 'brigadista'],
    default: 'brigadista',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;