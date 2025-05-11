const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  coverPhotoURL: { type: String, required: true },
  description: { type: String, required: true },
  numberProviders: { type: Number, default: 0 },
  // Added active flag to potentially disable categories
  active: { type: Boolean, default: true }
}, 
// Added timestamps
{ timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;