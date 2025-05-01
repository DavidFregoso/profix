const mongoose = require('mongoose');
const { Schema } = mongoose;


const jobSchema = new Schema({
    imageURL: { type: String, default: null },
    title: { type: String, required: [true, 'El título de trabajo es obligatorio'] },
    description: { type: String, required: [true, 'La descripción es obligatoria'] },
    date: { type: Date }
}, { _id: false });

const availabilitySchema = new Schema({
  day: { 
    type: String,
    required: true,
    enum: [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], 
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
  }
})

const providerDataSchema = new Schema({
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    categoryName: { type: String, required: true },
    location: { type: String, default: 'Guadalajara'},
    description: { type: String, required: true },
    coverPhotoURL: { type: String, default: null },
    hourlyRate: { type: Number, required: false },
    phoneNumber: { type: String, required: true },
    stars: { type: Number, min: 0, max: 5,  required: true, default: 0 },
    advertiser: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    availability: [availabilitySchema],
    jobs: [jobSchema],
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
    },
    name: { type: String, required: true },
    profilePhotoURL: { type: String, default: null },
    isProvider: { type: Boolean, default: false },
    providerData: { type: providerDataSchema, default: null }
});

const User = mongoose.model('User', userSchema)

module.exports = User;