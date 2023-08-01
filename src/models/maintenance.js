const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  implemento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Implemento',
    required: true,
  },
  estado: {
    type: String,
    enum: ['Finalizado', 'En mantenimiento'],
    required: true,
  },
  observaciones: {
    type: String,
    default: '',
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
