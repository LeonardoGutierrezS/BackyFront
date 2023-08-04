const Report = require('../models/report');
const maintenanceController = require('./maintenanceController');

exports.NuevoReporte = async (req, res) => {
  try {
    const { username, idImplemento, fecha, observaciones } = req.body;
    const nuevoInforme = new Report({
      username,
      idImplemento,
      fecha,
      observaciones,
    });

    await nuevoInforme.save();

    res.json({ message: 'Informe creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar un nuevo informe' });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    // Consultar la base de datos para obtener todos los reportes
    const reports = await Report.find();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los reportes' });
  }
};

exports.deleteAllReports = async (req, res) => {
  try {
    const deleteResult = await Report.deleteMany();
    if (deleteResult.deletedCount > 0) {
      res.status(200).json({ message: 'Se eliminaron todos los reportes correctamente.' });
    } else {
      res.status(404).json({ message: 'No se encontraron reportes para eliminar.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar los reportes.' });
  }
};

