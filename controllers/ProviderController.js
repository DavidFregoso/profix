const User = require("../models/user.model")


const createProvider = async (req, res) => {
    // the user to turn un provider must exist
    // you add the provider data, and change the state of isProvider
    try {
        const { username, category, location, description, hourlyRate } = req.body;

        // Get the user that want to be a provider 
        const currUser = User.findOne()

        const newSupplier = new User({
            name, user, password_hash, description,
        })

        const savedSupplier = await newSupplier.save();
        
        res.status(201).json(savedSupplier)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = { createProvider, getSuppliers}