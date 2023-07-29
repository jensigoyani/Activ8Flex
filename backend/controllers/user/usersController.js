const bcrypt = require("bcrypt")
const Instructor = require("../../Models/instructor/Instructor")
const ConatctUS = require("../../Models/user/ContactUS")
const Feedback = require("../../Models/user/Feedback")
const User = require("../../models/user/User")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const SendEmail = require("../../Utils/SendEmail")
const Token = require("../../models/user/token")
const Instructors = require("../../Models/instructor/Instructor")

//LOG OUT
const userLogOut = (req, res, next) => {
    try {
        window.addEventListener("beforeunload", function () {
            localStorage.clear();
        });
    } catch (ex) {
        next(ex)
    }
}

const resetPwdLink = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(404)
                .send({ message: "User with given email does not exist!" });

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await SendEmail(user.email, "Password Reset", url);

        res
            .status(200)
            .send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const userForgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const userForgotPasswordForm = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        if (!user.verified) user.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();
        await token.remove();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const userRegister = async (req, res) => {
    try {

        const { username, email, contact, gender, dob, commonIllness, password, Ins_id } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ message: "Username already used", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ message: "Email already used", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);

        const ins = await Instructors.findById(Ins_id)
        console.log("Instructor" ,ins);

        const user = await User.create({
            email,
            username,
            contact,    
            gender,
            dob,
            commonIllness,
            password: hashedPassword,
            Ins_id: ins
        });
        console.log(user);
        delete user.password;
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        return res.json({ message: "User registred successfully", status: true, user });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// FETCH ONE INSTRUCTOR
const getOneInstructors = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        res.json(instructor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//LOGIN
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        //INCORRECT E-MAIL
        if (!user)
            return res.json({ data: [], message: "Incorrect credentials", status: false })

        // INCORRECT PASSWORD
        const isPasswordValid = await bcrypt.compareSync(password, user.password)
        if (!isPasswordValid)
            return res.json({ data: [], message: "Incorrect credentials", status: false, accessToken: null })

        // TOKEN
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })

        return res.status(200).json({
            user,
            accessToken: token,
            msg: "Success",
            status: true
        })
    } catch (ex) {
        next(ex)
    }
}

//GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find({
            id: { $ne: req.params.id }
        }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(user)
    } catch (err) {
        next(err)
    }
}

//GET ALL INSTRUCTOR
const getAllinstructor = async (req, res, next) => {
    try {
        const user = await Instructor.find({
            id: { $ne: req.params.id }
        }).select([
            "email",
            "username",
            "_id"
        ])
        return res.json(user)
    } catch (err) {
        next(err)
    }
}

//CONTACT US
const userContactUs = async (req, res, next) => {
    try {
        //CREATING CONTACT US TABLE
        let contactUs = new ConatctUS({
            name: req.body.name,
            email: req.body.email,
            question: req.body.question
        })
        await contactUs.save()
        res.send(contactUs)
    } catch (error) {
        console.log("Error: " + error)
    }
}

//FEEDBACK
const userFeedback = async (req, res, next) => {
    try {
        //CREATING FEEDBACK TABLE
        let feedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback
        })
        await feedback.save()
        res.send(feedback)
    } catch (error) {
        console.log("Error: " + error)
    }
}

//FETCH ALL INSTARCTOR
const userAllInstructor = async (req, res, next) => {
    try {
        const instructor = await Instructor.find();
        if (!instructor) {
            return res.status(404).json({ msg: 'Instructor not found' });
        }
        res.json(instructor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

// FIND ONE USER
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// SAVE INFO OF USER
const saveUser = async (req, res) => {
    const user = new User(req.body)
    try {
        const inserteduser = await user.save()
        res.status(201).json(inserteduser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//UPDATE THE USER
const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({ _id: req.params.id }, { $set: req.body })
        res.status(200).json(updateduser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({ _id: req.params.id })
        res.status(200).json(deleteduser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//UPDATE PROFILE OF USER
const profileUpdate = (req, res, next) => {
    const id = req.user.id
    User.findByIdAndUpdate(id, query, { new: true, useFindAndModify: false })
        .then()
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
        const user = await User.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {
                const user = await User.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
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
    userRegister,
    getOneInstructors,
    userForgotPassword,
    ResetPassword,
    userForgotPasswordForm,
    resetPwdLink,
    userLogin,
    userLogOut,
    userContactUs,
    userFeedback,
    userAllInstructor,
    getAllUsers,
    getAllinstructor,
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    profileUpdate
}