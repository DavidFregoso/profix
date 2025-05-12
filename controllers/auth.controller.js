const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// POST /auth/register
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, name, isProvider, providerData } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario o correo ya registrado.' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password_hash,
      email,
      name,
      isProvider,
      providerData: isProvider ? providerData : null,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario.', error: err.message });
  }
};

// POST /auth/login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado.' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        isProvider: user.isProvider
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, username: user.username, isProvider: user.isProvider } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error: err.message });
  }
};
