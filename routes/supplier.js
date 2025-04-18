const express = require('express');
const router = express.Router();
const Supplier = require("../models/supplier.model")
const SupplierController = require("../controllers/SupplierController")

router.post('/', SupplierController.createSupplier);
router.get('/', SupplierController.getSuppliers);

module.exports = router;