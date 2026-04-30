const mongoose = require('mongoose');

const collegeFeedbackSchema = new mongoose.Schema({
    prn: {
        type: String,
        required: true,
        trim: true
    },
    issueType: {
        type: String,
        required: true,
        trim: true
    },
    comments: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CollegeFeedback', collegeFeedbackSchema);
