const Admin = require("../../models/Admin/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminRegister = async(req,res,next) => {
    try {
        const { email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            password: hashedPassword,
        });

        delete admin.password;
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while register admin"
        })
    }
}

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email })

        //INCORRECT E-MAIL
        if (!admin)
            return res.json({ data: [], msg: "Incorrect credentials", status: false })

        // INCORRECT PASSWORD
        const isPasswordValid = await bcrypt.compareSync(password, admin.password)
        if (!isPasswordValid)
            return res.json({ data: [], msg: "Incorrect credentials", status: false, accessToken: null })

        // TOKEN
        var token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })

        return res.status(200).json({
            admin,
            accessToken: token,
            msg: "Success",
            status: true
        })
    } catch (ex) {
        next(ex)
        return res.status(404).json({
            msg: "Incorreact",
            status: false
        })
    }
}

const ResetPassword = async (req, res, next) => {
    const { confirmPassword, currentPassword, newPassword } = req.body;
    console.log(confirmPassword, currentPassword, newPassword, req.params.id)

    if (!confirmPassword || !currentPassword || !newPassword) {
        return res.status(400).send("Please field cannot be empty")
    }
    const salt = await bcrypt.genSalt();
    const updatedPassword = await bcrypt.hash(newPassword, salt)
    if (!(confirmPassword === newPassword)) return res.status(400).send("Please Enter same password")
    console.log("Checking", confirmPassword == newPassword)
    if (confirmPassword == newPassword) {
        const user = await Admin.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {
                const user = await Admin.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
                res.status(200).send("Password Updated")
            }
            catch (err) {
                res.status(400).send({ err })
            }
        } else {
            res.status(400).send("Password dosen't match")
        }
    }
    else {
        res.status(400).send("Something went wron")
    }
}

module.exports = {
    adminRegister,
    adminLogin,
    ResetPassword
}