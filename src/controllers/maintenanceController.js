const Maintenance = require('../models/Maintenance');
const Implemento = require('../models/Implemento');

// Función para enviar un implemento a mantenimiento
exports.enviarMantenimiento = async (req, res) => {
  try {
    const { implementoId, observaciones } = req.body;

    const implemento = await Implemento.findById(implementoId);

    if (!implemento) {
      return res.status(404).json({ message: 'No se encontró el implemento.' });
    }

    if (implemento.estado !== 'Disponible') {
      return res.status(400).json({ message: 'El implemento no está disponible para mantenimiento.' });
    }

    const maintenance = new Maintenance({
      implemento: implementoId,
      estado: 'En Mantenimiento',
      observaciones: observaciones || '',
    });

    await maintenance.save();

    // Actualizar el estado del implemento a "No Disponible"
    implemento.estado = 'No Disponible';
    await implemento.save();

    res.json({ message: 'Implemento enviado a mantenimiento exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al enviar el implemento a mantenimiento.' });
  }
};

// Función para marcar un implemento como disponible
exports.marcarDisponible = async (req, res) => {
  try {
    const { implementoId } = req.body;

    const maintenance = await Maintenance.findOne({ implemento: implementoId });

    if (!maintenance) {
      return res.status(404).json({ message: 'No se encontró el implemento en mantenimiento.' });
    }

    // Realizar evaluación de implementos antes de marcarlos como disponibles 
    const implemento = await Implemento.findById(implementoId);
    const evaluacionExitosa = await realizarEvaluacion(implemento);

    if (!evaluacionExitosa) {
      return res.status(400).json({ message: 'No se han realizado las reparaciones necesarias en el implemento.' });
    }

    // Actualizar el estado del implemento a "Disponible"
    implemento.estado = 'Disponible';
    await implemento.save();

    // Eliminar la entrada de mantenimiento
    await maintenance.remove();

    // Registrar acción en el historial de operaciones de mantenimiento 
    await registrarOperacionMantenimiento(implemento, 'Disponible');

    res.json({ message: 'Implemento marcado como disponible exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al marcar el implemento como disponible.' });
  }
};

// Función para realizar la evaluación de implementos 
async function realizarEvaluacion(implemento) {
  // Lógica de evaluación de implementos
  // Verificar si se realizaron las reparaciones necesarias
  const reparacionesRealizadas = implemento.reparacionesRealizadas || [];
  const reparacionesNecesarias = implemento.reparacionesNecesarias || [];

  // Comparar las reparaciones realizadas con las reparaciones necesarias
  const evaluacionExitosa = reparacionesNecesarias.every(reparacion => reparacionesRealizadas.includes(reparacion));

  return evaluacionExitosa;
}

// Función para registrar una operación en el historial de operaciones de mantenimiento 
async function registrarOperacionMantenimiento(implemento, estado) {
  const operacion = {
    implemento: implemento._id,
    fecha: new Date(),
    estado: estado,
  };

  implemento.historial.push(operacion);
  await implemento.save();
}

module.exports = {
  enviarMantenimiento,
  marcarDisponible,
};
//