const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Creacion del usuario
router.post('/users/create', userController.createUser);

// Obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Eliminar un usuario
router.delete('/users/:id', userController.deleteUser);

module.exports = router;