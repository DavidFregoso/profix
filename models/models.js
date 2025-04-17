const mongoose = require('mongoose');

const userData = "mongodb+srv://alfredo:alfredo@sistemasescalables.s5sqk.mongodb.net/?retryWrites=true&w=majority&appName=SistemasEscalables";

mongoose.connect(userData);

const db = mongoose.connection;

db.on("connecting", () => {
    console.log("Connecting...");
    console.log(mongoose.connection.readyState); // State 2: Connecting...
});
db.on("connected", () => {
    console.log("Connection successful!");
    console.log(mongoose.connection.readyState); // State 1: Connected...
});

// Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String },
    description: { type: String }
});

// User Schema
const userSchema = new mongoose.Schema({
    account_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profile_picture: { type: String },
    role: { 
        type: String, 
        enum: ['user', 'provider'], 
        required: true 
    },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    provider_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String },
    date: { type: Date, default: Date.now }
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    provider_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, required: true }
});

// Models
const Category = mongoose.model('Category', categorySchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Category, User, Review, Appointment };