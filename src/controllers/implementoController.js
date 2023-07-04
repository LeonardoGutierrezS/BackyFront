const Implemento = require('../models/Implemento');

// Controlador para crear un nuevo implemento
exports.createImplemento = async (req, res) => {
  try {
    const { descripcion, categoria, estado, numeroSerie } = req.body;

    // Crear un nuevo implemento
    const nuevoImplemento = new Implemento({
      descripcion,
      categoria,
      estado,
      numeroSerie,
    });

    // Guardar el implemento en la base de datos
    await nuevoImplemento.save();

    res.status(200).json({ message: 'Implemento registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar implemento' });
  }
};

// Controlador para obtener todos los implementos
exports.getAllImplementos = async (req, res) => {
  try {
    const implementos = await Implemento.find();
    res.status(200).json(implementos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener implementos' });
  }
};

// Otros controladores para la gestión de implementos (actualizar, eliminar, etc.)
// ...
