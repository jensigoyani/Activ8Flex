const mongoose = require('mongoose');

const appointMentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    weight: {
        type: Number,
    },
    service: {
        type: String
    },
    date: {
        type: Date
    },
    stauts: {
        type: String,
        default: "Pending"
    },
    instructor: {
        type: String
    }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", appointMentSchema)
module.exports = Appointment