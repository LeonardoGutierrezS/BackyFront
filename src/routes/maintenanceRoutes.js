const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');

// Ruta para enviar un implemento a mantenimiento
router.post('/enviar-mantenimiento', mantenimientoController.enviarMantenimiento);

// Ruta para marcar un implemento como disponible
router.post('/marcar-disponible', mantenimientoController.marcarDisponible);

// Ruta para realizar la evaluación de implementos
router.get('/evaluar-implementos', mantenimientoController.evaluarImplementos);

// Ruta para registrar una operación en el historial de operaciones de mantenimiento
router.post('/registrar-operacion', mantenimientoController.registrarOperacion);

module.exports = router;
//