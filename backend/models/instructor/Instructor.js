const mongoose = require('mongoose')

const instructor = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email is required"],
    },
    phone: {
        type: String,
        required: true  
    },
    qualification: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        required: [true, "experience is required"],
    },
    password: {
        type: String,
        require: true,
        minlength: 10
    },
    resetToken: String,
    expireToken: Date,
})

const Instructors = mongoose.models.Instructor || mongoose.model("Instructor", instructor);
module.exports = Instructors 