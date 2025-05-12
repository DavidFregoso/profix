const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:providerId', jobController.getJobs);
router.post('/:providerId', authMiddleware, jobController.createJob);

module.exports = router;
