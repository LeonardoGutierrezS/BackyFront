const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { username,rut, password, role } = req.body;

    const existingUser = await User.findOne({ rut });

    if (existingUser) {
      existingUser.password = password;
      existingUser.role = role;
      await existingUser.save();

      res.status(200).json({ message: 'Usuario repetido, no ha sido registrado' });
    } else {
      const newUser = await User.create({
        username,
        rut,
        password,
        role,
      });

      res.status(200).json({ message: 'Usuario registrado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
}