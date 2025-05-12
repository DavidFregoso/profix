const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET /user/me
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password_hash');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil de usuario.', error: err.message });
  }
};

// PUT /user/me
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profilePhotoURL, password } = req.body;

    // Actualizar contraseña si se proporciona
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password_hash = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { name, email, profilePhotoURL, password_hash: req.body.password_hash }, 
      { new: true }
    ).select('-password_hash');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Perfil actualizado exitosamente.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil.', error: err.message });
  }
};
