const User = require('../models/User');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { rut, password, role } = req.body;

    // Crear un nuevo usuario
    const newUser = new User({
      rut,
      password,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { rut, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { rut, password, role },
      { new: true }
    );
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};