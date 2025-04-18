const mongoose = require('mongoose');


const supplierSchema = mongoose.Schema({
    name: {type: String, required: true},
    user: {
        type: String, 
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password_hash: {type: String, required: true},
    description: {type: String, required: false},
    profile_photo: {
        type: String,
        required: false,
        default: null,
    },
    cover_photo: {
        type: String,
        required: false,
        default: null,
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    advertiser: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
        default: 0,
    },
    jobs: [{
        image: {
            type: String,
            required: false,
            default: null,
        },
        description: {
            type: String,
            required: [true, 'Descripción obligatorio']
        },
        date: {
            type: Date,
            required: false,
        }
    }]
})

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;