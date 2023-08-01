const mongoose = require('mongoose');

const implementoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  numeroSerie: {
    type: String,
    required: true,
  },
  asignadoA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fechaMantenimiento: Date,
  historial: [
    {
      descripcion: String,
      categoria: String,
      estado: String,
      numeroSerie: String,
      asignadoA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      fechaMantenimiento: Date,
      fechaCambio: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

implementoSchema.statics.findByIdAndUpdate = async function (id, updateData) {
  try {
    const implemento = await this.findByIdAndUpdate(id, updateData, { new: true });
    return implemento;
  } catch (error) {
    throw new Error(error);
  }
};


const Implemento = mongoose.model('implemento', implementoSchema);

module.exports = Implemento;

