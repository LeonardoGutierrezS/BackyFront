const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');

// Ruta para enviar un implemento a mantenimiento
router.post('/enviar-mantenimiento', mantenimientoController.enviarMantenimiento);

// Ruta para marcar un implemento como disponible
router.post('/marcar-disponible', mantenimientoController.marcarDisponible);

module.exports = router;
