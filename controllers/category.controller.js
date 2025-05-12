const Category = require('../models/category.model');
const User = require('../models/user.model');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ active: true }).sort({ name: 1 });
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        const category = await Category.findOne({ _id: categoryId, active: true });
        
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        res.status(200).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener categoría' });
    }
};

const createCategory = async (req, res) => {
    try {
        // Typically admin only functionality
        const { name, description, coverPhotoURL } = req.body;
        
        if (!name || !description || !coverPhotoURL) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        
        // Generate slug from name
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        const newCategory = new Category({
            name,
            slug,
            description,
            coverPhotoURL,
            active: true
        });
        
        const savedCategory = await newCategory.save();
        
        res.status(201).json(savedCategory);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
        }
        console.log(err);
        res.status(500).json({ message: 'Error al crear categoría' });
    }
};

const updateCategory = async (req, res) => {
    try {
        // Typically admin only functionality
        const { categoryId } = req.params;
        const { name, description, coverPhotoURL, active } = req.body;
        
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        // Update fields if provided
        if (name) {
            category.name = name;
            // Update slug if name changes
            category.slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        if (description) category.description = description;
        if (coverPhotoURL) category.coverPhotoURL = coverPhotoURL;
        if (active !== undefined) category.active = active;
        
        const updatedCategory = await category.save();
        
        res.status(200).json(updatedCategory);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
        }
        console.log(err);
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
};

const getProvidersByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        // Check if category exists
        const category = await Category.findOne({ _id: categoryId, active: true });
        
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        // Find providers in this category
        const providers = await User.find({
            isProvider: true,
            'providerData.category': categoryId,
            status: 'active'
        })
        .select('-password_hash')
        .sort({ 'providerData.averageRating': -1 });
        
        res.status(200).json(providers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener proveedores por categoría' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    getProvidersByCategory
};