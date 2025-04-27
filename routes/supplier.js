const express = require('express');
const router = express.Router();
const ProviderController = require("../controllers/ProviderController")

router.post('/', ProviderController.createProvider);
router.get('/', ProviderController.getSuppliers);

module.exports = router;