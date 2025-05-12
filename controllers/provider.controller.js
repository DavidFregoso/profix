const Provider = require('../models/user.model');
const Category = require('../models/category.model');

// GET /provider
exports.listProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ isProvider: true }).populate('providerData.category');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener proveedores.', error: err.message });
  }
};

// POST /provider
exports.createProvider = async (req, res) => {
  try {
    const { category, location, description, coverPhotoURL, hourlyRate, phoneNumber } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Categoría no válida.' });
    }

    const newProvider = new Provider({
      ...req.body,
      isProvider: true,
      providerData: { category, categoryName: categoryExists.name, location, description, coverPhotoURL, hourlyRate, phoneNumber }
    });

    await newProvider.save();
    res.status(201).json({ message: 'Proveedor creado exitosamente.', provider: newProvider });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear proveedor.', error: err.message });
  }
};

// PUT /provider
exports.updateProvider = async (req, res) => {
  try {
    const { category, location, description, coverPhotoURL, hourlyRate, phoneNumber } = req.body;

    const updatedProvider = await Provider.findByIdAndUpdate(
      req.user._id,
      {
        providerData: { category, location, description, coverPhotoURL, hourlyRate, phoneNumber }
      },
      { new: true }
    );

    if (!updatedProvider) {
      return res.status(404).json({ message: 'Proveedor no encontrado.' });
    }

    res.json(updatedProvider);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar proveedor.', error: err.message });
  }
};

// GET /provider/featured-providers
exports.getFeaturedProviders = async (req, res) => {
  try {
    const featuredProviders = await Provider.find({ 'providerData.advertiser': true }).populate('providerData.category');
    res.json(featuredProviders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener proveedores destacados.', error: err.message });
  }
};

// GET /provider/:providerId
exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId).populate('providerData.category');
    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado.' });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener proveedor.', error: err.message });
  }
};
