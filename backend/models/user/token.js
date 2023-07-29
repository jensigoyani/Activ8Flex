const mongoose = require("mongoose");

const tokenSchema =  mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token
