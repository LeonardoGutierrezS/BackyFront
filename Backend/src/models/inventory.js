const express = require('express');
const router = express.Router(); 
const ImplementoController = require('../controllers/implementoController');

router.get('/inventory', async (req, res) => {
  try {
    const inventory = await ImplementoController.getAllImplementos(); 
    res.status(200).json(inventory); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inventario', error });
  }
});

module.exports = router;
