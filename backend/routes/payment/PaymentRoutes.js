const { Router } = require('express');
const { paymentController } = require('../../controllers');

const paymentRoutes = new Router();

paymentRoutes.post('/pay-order', paymentController.payinvoice);
paymentRoutes.post('/create-order', paymentController.createInvoice);
paymentRoutes.get('/list-invoices', paymentController.listInvoice);
paymentRoutes.get('/get-razorpay-key', paymentController.getKey);
paymentRoutes.delete('/payments/:id', paymentController.deletePayment);

module.exports = paymentRoutes;