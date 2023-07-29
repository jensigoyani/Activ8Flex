const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    commonIllness: {
        type: [String],
    },
    image: {
        type: String,
    },
    Ins_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,
});

module.exports = mongoose.model("Users", User); 