const mongoose = require("mongoose");

const tokenSchema =  mongoose.Schema({
	instructorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Instructor",
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token = mongoose.model("TokenIntructor", tokenSchema);
module.exports = Token
