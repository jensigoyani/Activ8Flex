const {Router} = require('express')
const { adminController } = require('../../controllers')

const adminRouter = new Router()

adminRouter.post('/register', adminController.adminRegister)

adminRouter.post("/login", adminController.adminLogin)

adminRouter.put('/change-password/:id', adminController.ResetPassword)

module.exports = {
    adminRouter
}