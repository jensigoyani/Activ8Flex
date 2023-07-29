const { Router } = require('express')
const { appointmentController } = require('../../controllers')

const appointmentRouter = new Router()

//TAKE AN APPOINTMENT
appointmentRouter.post('/addappointment', appointmentController.AddAppointMentCollection)

//APPOINTMENT LIST
appointmentRouter.get('/appointmentlist', appointmentController.showAppointmentList)

//CRUD OPERATIONS
appointmentRouter.get('/appointments', appointmentController.getAppointment);
appointmentRouter.get('/appointments/:id', appointmentController.getAppointmentById);
appointmentRouter.post('/appointments', appointmentController.saveAppointment);
appointmentRouter.patch('/appointments/:id', appointmentController.updateAppointment);
appointmentRouter.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = appointmentRouter
