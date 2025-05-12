const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:providerId', reviewController.getReviews);
router.post('/:providerId', authMiddleware, reviewController.createReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;
