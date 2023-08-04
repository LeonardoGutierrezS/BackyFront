express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

//crea un nuevo reporte
router.post('/crearreporte', reportController.NuevoReporte);

//obtiene todos los reportes
router.get('/reportes', reportController.getAllReports);

//elimina todos los reportes
router.delete('/reportes', reportController.deleteAllReports);

module.exports = router;
