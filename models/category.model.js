const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  coverPhotoURL: { type: String, required: true },
  description: { type: String, required: true },
  numberProviders: { type: Number, default: 0 }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;