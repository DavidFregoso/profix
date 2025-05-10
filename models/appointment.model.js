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
    hour: { 
        type: String, 
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/  // HH:MM 24 hours format
    }, 
    comment: {
        type: String, 
        required: false,
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;