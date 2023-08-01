const express = require('express');
const router = express.Router(); Agregar esta línea
const ImplementoController = require('../controllers/implementoController');

router.get('/inventory', async (req, res) => {
  try {
    // Obtener todos los implementos de la base de datos
    const inventory = await ImplementoController.getAllImplementos(); // Consulta para obtener todos los implementos
    res.status(200).json(inventory); // Responder con los datos del inventario
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inventario', error });
  }
});

module.exports = router;
