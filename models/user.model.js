const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    imageURL: { type: String, default: null },
    title: { type: String, required: [true, 'El título de trabajo es obligatorio'], trim: true },
    description: { type: String, required: [true, 'La descripción es obligatoria'], trim: true },
    date: { type: Date, default: Date.now }
}, { _id: false });

const availabilitySchema = new Schema({
  day: { 
    type: String,
    required: true,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], 
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM 24 hours format
  },
  endTime: { 
    type: String, 
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM 24 hours format
  },
  // Added isAvailable flag to temporarily disable time slots
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const providerDataSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  categoryName: { type: String, required: true },
  location: { type: String, default: 'Guadalajara' },
  description: { type: String, required: true, trim: true },
  coverPhotoURL: { type: String, default: null },
  hourlyRate: { type: Number, required: false },
  phoneNumber: { 
    type: String, 
    required: true
  },

  stars: {
    type: Map,
    of: Number,
    default: () => ({
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    })
  },
  // Added two simple fields for easier querying
  totalReviews: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },

  advertiser: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  availability: [availabilitySchema],
  jobs: [jobSchema]
}, { _id: false });

const userSchema = new Schema({
    username: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password_hash: {
      type: String,
      required: [true, 'Ingresar contraseña para crear usuario']
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    name: { type: String, required: true, trim: true },
    profilePhotoURL: { type: String, default: null },
    isProvider: { type: Boolean, default: false },
    providerData: { type: providerDataSchema, default: null },
    // Simple status field
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
}, 
// Added timestamps
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;