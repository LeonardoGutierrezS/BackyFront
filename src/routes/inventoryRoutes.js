const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController')

// Ruta para obtener el inventario
router.get('/inventory', inventoryController.getInventory);

// Ruta para actualizar el inventario
router.put('/inventory/:id', inventoryController.updateInventory);

// Ruta para obtener el historial de un implemento
router.get('/inventory/history', inventoryController.getInventoryHistory);

//Ruta para mostrar inventario filtrando por estado
router.get('/inventory/:estado', inventoryController.getInventoryByEstado);

module.exports = router;
