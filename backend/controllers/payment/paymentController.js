const Razorpay = require('razorpay');
const Payment = require('../../models/payment/Payment');
const User = require('../../models/user/User');

const createInvoice = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send('Some error occured');
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}
const payinvoice = async (req, res) => {
    try {
        const { username, emailId, amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
            req.body;
        const newOrder = Payment({
            username: username,
            isPaid: true,
            amount: amount,
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            signature: razorpaySignature,
            email: emailId
        });
        await newOrder.save();
        res.send({
            msg: 'Payment was successfull',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const listInvoice = async (req, res) => {
    const payment = await Payment.find();
    res.send(payment);
}

const getKey = (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
}

const deletePayment = async (req, res) => {
    try {
        const deletedpayment = await Payment.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedpayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createInvoice,
    payinvoice,
    listInvoice,
    getKey,
    deletePayment
};