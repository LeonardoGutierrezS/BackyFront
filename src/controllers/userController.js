const User = require('../models/User');

// Controlador para crear un nuevo usuario
/*exports.createUser = async (req, res) => {
  try {
    const {username,rut, password, role } = req.body;

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      rut,
      password,
      role,
    });

    // Guardar el usuario en la base de datos
   await newUser.save();

    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};*/

exports.createUser = async (req, res) => {
  try {
    const { username,rut, password, role } = req.body;

    // Verificar si un usuario con el mismo rut ya existe
    const existingUser = await User.findOne({ rut });

    // Si el usuario ya existe, actualizar su password y role
    if (existingUser) {
      existingUser.password = password;
      existingUser.role = role;
      await existingUser.save();

      res.status(200).json({ message: 'Usuario repetido, no ha sido registrado' });
    } else {
      // Crear un nuevo usuario
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


// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
}