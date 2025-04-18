const Supplier = require("../models/supplier.model")


const createSupplier = async (req, res) => {
    try {
        const { name, user, password_hash, description } = req.body;

        const newSupplier = new Supplier({
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

module.exports = {createSupplier, getSuppliers}