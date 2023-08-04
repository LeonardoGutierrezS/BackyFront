const Implemento = require('../models/implemento');

const createImplemento = async (req, res) => {
  try {
    const { descripcion, categoria, estado, numeroSerie } = req.body;

    const nuevoImplemento = new Implemento({
      descripcion,
      categoria,
      estado,
      numeroSerie,
    });

    await nuevoImplemento.save();

    res.status(200).json({ message: 'Implemento registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar implemento' });
  }
};

const getAllImplementos = async () => {
  const implementos = await Implemento.find();
  return implementos;
};

const getAllImplementosByEstado = async (estado) => {
  const implementos = await Implemento.find({ estado });
  return implementos;
};

const getImplementoById = async (id) => {
  const implementos = await Implemento.find({ id });
  return implementos;
};

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, categoria, estado, numeroSerie, asignadoA, fechaMantenimiento } = req.body;

    const updateData = { descripcion, categoria, estado, numeroSerie, asignadoA, fechaMantenimiento };

    const implementoActualizado = await Implemento.findByIdAndUpdate(id, updateData);

    if (!implementoActualizado) {
      return res.status(404).json({ message: 'Implemento no encontrado' });
    }

    res.status(200).json(implementoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el inventario', error });
  }
};

module.exports = {
  getImplementoById,
  createImplemento,
  getAllImplementos,
  getAllImplementosByEstado,
  updateInventory,
}