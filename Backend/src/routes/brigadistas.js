const express = require('express');
const router = express.Router();
const Brigadista = require('../models/brigadista');

router.post('/brigadistas', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    const nuevoBrigadista = new Brigadista({
      nombre,
      apellido,
      edad,
      correo
    });

    await nuevoBrigadista.save();

    res.status(200).json({ message: 'Brigadista registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar brigadista' });
  }
});

module.exports = router;
