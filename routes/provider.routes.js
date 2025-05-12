const express = require('express');
const router = express.Router();
const providerController = require('../controllers/provider.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', providerController.listProviders);
router.post('/', authMiddleware, providerController.createProvider);
router.put('/', authMiddleware, providerController.updateProvider);
router.get('/featured-providers', providerController.getFeaturedProviders);
router.get('/:providerId', providerController.getProvider);

module.exports = router;
