const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    day: { 
        type: Date,
        required: true,
    },
    // Changed from single hour to start and end times
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
    // Added status field to track appointment state
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    },
    comment: {
        type: String, 
        required: false,
    }
}, 
// Added timestamps for better tracking
{ timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;