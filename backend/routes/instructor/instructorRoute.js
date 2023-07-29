const { Router } = require('express');
const { instructorController } = require('../../controllers');

const instructorRouter = new Router();

//REGISTER
instructorRouter.post("/add-ins", instructorController.instructorRegister)

//LOGIN 
instructorRouter.post('/login', instructorController.instructorLogin)

//FETCH CONTACTUS DETAILS
instructorRouter.get('/contactus', instructorController.instructorContactUS)

//FETCH FEEDBACK
instructorRouter.get('/feedback', instructorController.instructorFeedback)

//FETCH USER DETAILS
instructorRouter.get('/allusers', instructorController.instructorAllUser)

// CRUD
instructorRouter.get('/instructors', instructorController.getInstructor);
instructorRouter.get('/instructors/:id', instructorController.getInstructorById);
instructorRouter.post('/instructors', instructorController.saveInstructor);
instructorRouter.patch('/instructors/:id', instructorController.updateInstructor);
instructorRouter.delete('/instructors/:id', instructorController.deleteInstrucror);

instructorRouter.post('/password-link', instructorController.resetPwdLink)
instructorRouter.get('/forget-password/:id/:token', instructorController.InsForgotPassword)
instructorRouter.post('/forget-password/:id/:token', instructorController.InsForgotPasswordForm)
instructorRouter.put('/change-password/:id', instructorController.ResetPassword)

module.exports = instructorRouter