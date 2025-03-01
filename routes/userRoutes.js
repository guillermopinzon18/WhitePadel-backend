const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    // Simulación de token (si usas JWT, aquí generas el token)
    const token = "fake-jwt-token";

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: { id: newUser._id, email, puntos: 0 },
      token
    });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
router.get('/health', (req, res) => {
  res.status(200).json({ message: "Servidor activo" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'El correo no está registrado' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Simulación de token
    const token = "fake-jwt-token";

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: { id: user._id, email, puntos: user.puntos || 0 },
      token
    });
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para obtener todos los usuarios
router.get('/all', async (req, res) => {
  try {
    // Busca todos los usuarios
    const users = await User.find({}, { password: 0 }); 

    res.status(200).json(users);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Elimina el usuario
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
// Ruta para obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Busca el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve el usuario (sin la contraseña)
    const userData = {
      email: user.email,
      puntosdepartido: user.puntosdepartido,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
// Ruta para editar un usuario por su ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password, puntosdepartido } = req.body;

    // Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza los campos del usuario
    if (email) user.email = email;
    if (password) user.password = password;
    if (puntosdepartido !== undefined) user.puntosdepartido = puntosdepartido;

    // Guarda los cambios
    await user.save();

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;