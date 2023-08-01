const Implemento = require('../models/implemento');
const Maintenance = require('../models/Maintenance');
const ImplementoController = require('./implementoController');

// Controlador para enviar un implemento a "mantención" y actualizar su estado
exports.enviarMantenimiento = async (req, res) => {
  try {
    const { id, observaciones } = req.body;

    // Buscar el implemento en la base de datos por su ID
    const implemento = await Implemento.findById(id);

    if (!implemento) {
      return res.status(404).json({ message: 'No se encontró el implemento.' });
    }
    if (implemento.estado !== 'Operativo') {
      return res.status(400).json({ message: 'El implemento no está disponible para mantenimiento.' });
    }

    // Crear un nuevo registro de mantenimiento
    const maintenance = new Maintenance({
      implemento: implemento._id,
      estado: 'En mantenimiento',
      observaciones: observaciones || '',
    });

    // Guardar el registro de mantenimiento en la base de datos
    await maintenance.save();

    // Actualizar el estado del implemento a "Inoperativo"
    implemento.estado = 'En mantenimiento';
    await implemento.save();
    res.json({ message: 'Implemento enviado a mantenimiento exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al enviar el implemento a mantenimiento.' });
  }
};

// Controlador para marcar un implemento como disponible
exports.marcarDisponible = async (req, res) => {
  try {
    const { id } = req.body; // Obtener la "id" del cuerpo de la solicitud

    // Buscar el implemento en la base de datos por su ID
    const implemento = await Implemento.findById(id);

    if (!implemento) {
      return res.status(404).json({ message: 'No se encontró el implemento.' });
    }

    if (implemento.estado !== 'En mantenimiento') {
      return res.status(400).json({ message: 'El implemento no está en mantenimiento.' });
    }

      implemento.estado = 'Operativo';
      await implemento.save();


    res.json({ message: 'Implemento marcado como disponible exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al marcar el implemento como disponible.' });
  }
};