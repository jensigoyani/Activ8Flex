const { Router } = require("express");
const { userController } = require("../../controllers");

const userRouter = new Router();

//REGISTER
userRouter.post("/register", userController.userRegister)

//LOGIN
userRouter.post("/login", userController.userLogin)

//LOGOUT
userRouter.delete("/logout", userController.userLogOut);

userRouter.put('/change-password/:id', userController.ResetPassword)

//CONTACT US
userRouter.post('/contactus', userController.userContactUs)

//FEEDBACK
userRouter.post('/feedback', userController.userFeedback)

//ALL INSTRUCTOR
userRouter.get('/allInstructors', userController.userAllInstructor)

userRouter.get("/oneInstructors/:id", userController.getOneInstructors);

userRouter.get("/allUsers/:id", userController.getAllUsers);

userRouter.get("/allInstructors/:id", userController.getAllinstructor);

userRouter.get("/logout/:id", userController.userLogOut);

// CRUD
userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.post('/users', userController.saveUser);
userRouter.patch('/users/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

userRouter.post('/password-link', userController.resetPwdLink)
userRouter.get('/forget-password/:id/:token', userController.userForgotPassword)
userRouter.post('/forget-password/:id/:token', userController.userForgotPasswordForm)

module.exports = userRouter
