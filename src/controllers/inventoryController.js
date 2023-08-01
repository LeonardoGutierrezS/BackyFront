const Implemento = require('../models/implemento');
const ImplementoController = require('./implementoController');

exports.getInventory = async (req, res) => {
  try {
    const implementos = await ImplementoController.getAllImplementos();
    res.status(200).json(implementos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el inventario' });
  }
};
exports.getInventoryByEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const implementos = await Implemento.find({ estado });
    res.status(200).json(implementos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el inventario por estado', error });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, categoria, estado, numeroSerie, asignadoA, fechaMantenimiento } = req.body;
    const updateData = { descripcion, categoria, estado, numeroSerie, asignadoA, fechaMantenimiento };

    const implementoActual = await ImplementoController.findById(id).lean();

    if (!implementoActual) {
      return res.status(404).json({ message: 'Implemento no encontrado' });
    }
    const historialEntry = { ...implementoActual, fechaCambio: new Date() };
    await Implemento.findByIdAndUpdate(id, { $push: { historial: historialEntry } });

    const implementoActualizado = await ImplementoController.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(implementoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el inventario', error });
  }
};


exports.getImplementoById = async (req, res) => {
  try {
    const { id } = req.params;
    const implemento = await ImplementoController.findById(id);

    if (!implemento) {
      return res.status(404).json({ message: 'Implemento no encontrado' });
    }

    res.status(200).json(implemento);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el implemento', error });
  }
};

exports.getInventoryHistory = async (req, res) => {
  try {
    const historialInventario = await Implemento.find({}, 'historial');

    res.status(200).json(historialInventario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial del inventario', error });
  }
};
