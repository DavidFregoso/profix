const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, 
// Added timestamps
{ timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;