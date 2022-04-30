const mongoose = require('mongoose');

// Appointment Schema

const historySchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    typeOfService: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentHour: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    appointmentDuration: {
        type: String,
        required: true,
    },
    takenBy: {
        type: String,
        default: "Not taken",
    },
    reason: {
        type: String,
        default: "No reason",
    }
    
})

module.exports = mongoose.model('history', historySchema);