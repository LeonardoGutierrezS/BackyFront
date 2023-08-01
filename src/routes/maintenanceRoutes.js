const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// Enviar implemento a mantencion
router.post('/enviarmantenimiento', maintenanceController.enviarMantenimiento);

// Marcar implemento como estado : operativo
router.post('/marcardisponible', maintenanceController.marcarDisponible);

module.exports = router;
