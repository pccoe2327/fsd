const mongoose = require('mongoose');

const courseFeedbackSchema = new mongoose.Schema({
    prn: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    faculty: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CourseFeedback', courseFeedbackSchema);
