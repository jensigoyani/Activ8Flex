const mongoose = require('mongoose')

const payment = mongoose.Schema({
    username: String,
    isPaid: Boolean,
    amount: Number,
    orderId: String,
    paymentId: String,
    signature: String,
    email: String
}, {
    timestamps: true
})

const Payment = mongoose.model("Payment", payment);
module.exports = Payment