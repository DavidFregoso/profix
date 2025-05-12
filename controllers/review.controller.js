const Review = require('../models/review.model');
const User = require('../models/user.model');

// GET /review/:providerId
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('user', 'name email');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reseñas.', error: err.message });
  }
};

// POST /review/:providerId
exports.createReview = async (req, res) => {
  try {
    const { stars, title, comment } = req.body;

    const newReview = new Review({
      provider: req.params.providerId,
      user: req.user._id,
      userName: req.user.name,
      stars,
      title,
      comment
    });

    await newReview.save();

    // Actualizar el promedio de estrellas del proveedor
    const provider = await User.findById(req.params.providerId);
    if (provider) {
      const totalReviews = provider.providerData.totalReviews + 1;
      const newAverage = (provider.providerData.averageRating * provider.providerData.totalReviews + stars) / totalReviews;
      provider.providerData.totalReviews = totalReviews;
      provider.providerData.averageRating = newAverage;
      await provider.save();
    }

    res.status(201).json({ message: 'Reseña creada exitosamente.', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear reseña.', error: err.message });
  }
};

// DELETE /review/:reviewId
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada.' });
    }

    // Actualizar el promedio de estrellas del proveedor
    const provider = await User.findById(review.provider);
    if (provider) {
      const totalReviews = provider.providerData.totalReviews - 1;
      const newAverage = totalReviews > 0 
        ? (provider.providerData.averageRating * provider.providerData.totalReviews - review.stars) / totalReviews
        : 0;
      provider.providerData.totalReviews = totalReviews;
      provider.providerData.averageRating = newAverage;
      await provider.save();
    }

    res.json({ message: 'Reseña eliminada exitosamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar reseña.', error: err.message });
  }
};
