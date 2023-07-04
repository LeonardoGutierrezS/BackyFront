const Maintenance = require('../models/Maintenance');

// Controlador para crear un nuevo mantenimiento
exports.createMaintenance = async (req, res) => {
  try {
    const { implementoId, fecha, descripcion } = req.body;

    // Crear un nuevo mantenimiento
    const newMaintenance = new Maintenance({
      implemento: implementoId,
      fecha,
      descripcion,
    });

    // Guardar el mantenimiento en la base de datos
    await newMaintenance.save();

    res.status(200).json({ message: 'Mantenimiento registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar mantenimiento' });
  }
};

// Controlador para obtener todos los mantenimientos
exports.getAllMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mantenimientos' });
  }
};

// Otros controladores para la gestión de mantenimientos (actualizar, eliminar, etc.)
// ...
