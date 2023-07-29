const instructorRoute = require('./instructor/instructorRoute');
const userRouter = require('./user/userRoute');
const appointmentRouter = require('./Appointment/appointmentRoute');
const paymentRoutes = require('./payment/PaymentRoutes');
const { adminRouter } = require('./Admin/adminRoute');

const router = new require('express').Router()

router.use('/user', userRouter);
router.use('/instructor', instructorRoute)
router.use('/appointment', appointmentRouter)
router.use('/payment', paymentRoutes)
router.use('/admin', adminRouter)

module.exports = router