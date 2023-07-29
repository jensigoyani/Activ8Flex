const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Instructors = require('../../Models/instructor/Instructor')
const ContactUS = require('../../Models/user/ContactUS')
const Feedback = require('../../Models/user/Feedback')
const User = require('../../models/user/User')
const Token = require('../../models/instructor/token')

//REGISTER
const instructorRegister = async (req, res, next) => {
    try {
        const { name, email, phone, qualification, experience, password } = req.body;
        const usernameCheck = await Instructors.findOne({ name });
        if (usernameCheck)
            return res.json({ message: "Username already used", status: false });

        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ message: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);

        const instructor = await Instructors.create({
            name,
            email,
            phone,
            qualification,
            experience,
            password: hashedPassword
        });
        delete instructor.password;

        const token = await new Token({
            instructorId: instructor._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        return res.json({ status: true, instructor });
    } catch (ex) {
        next(ex);
    }
}

// LOGIN
const instructorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const instructor = await Instructors.findOne({ email });
        if (!instructor)
            return res.json({ message: "Incorrect Creditionals ", status: false });
        const isPasswordValid = await bcrypt.compare(password, instructor.password);
        if (!isPasswordValid)
            return res.json({ message: "Incorrect Creditionals", status: false });
        delete instructor.password;
        var token = jwt.sign({ id: instructor.id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        return res.json({ status: true, instructor, accessToken: token });
    } catch (ex) {
        next(ex);
    }
}

// Fetch contact us details 
const instructorContactUS = async (req, res, next) => {
    ContactUS.find((err, val) => {
        if (err) {
            console.log(err);
        } else {
            res.json(val)
        }
    })
}

//Fetch feedback details
const instructorFeedback = async (req, res, next) => {
    Feedback.find((err, val) => {
        if (err) {
            console.log(err);
        } else {
            res.json(val)
        }
    })
}

//Fetch all user details
const instructorAllUser = async (req, res, next) => {
    User.find((err, val) => {
        if (err) {
            console.log(err);
        } else {
            res.json(val)
        }
    })
}

// GET INSTRUCTOR
const getInstructor = async (req, res) => {
    try {
        const instructors = await Instructors.find();
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GET INSTRCUTOR BY ID
const getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructors.findById(req.params.id);
        res.json(instructor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// SAVE INSTRUCTOR
const saveInstructor = async (req, res) => {
    const instructor = new Instructors(req.body);
    try {
        const insertedinstructor = await instructor.save();
        res.status(201).json(insertedinstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// UPDATE INSTRUCTOR
const updateInstructor = async (req, res) => {
    try {
        const updatedinstructor = await Instructors.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedinstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE INSTRUCTOR
const deleteInstrucror = async (req, res) => {
    try {
        const deletedinstructor = await Instructors.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedinstructor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const InsForgotPassword = async (req, res) => {
    try {
        const ins = await Instructors.findOne({ _id: req.params.id });
        if (!ins) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            instructorId: ins._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        res.status(200).send("Valid Url");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const InsForgotPasswordForm = async (req, res) => {
    try {
        const ins = await Instructors.findOne({ _id: req.params.id });
        if (!ins) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            instructorId: ins._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        if (!ins.verified) ins.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        ins.password = hashPassword;
        await ins.save();
        await token.remove();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const resetPwdLink = async (req, res) => {
    try {
        let ins = await Instructors.findOne({ email: req.body.email });
        if (!ins)
            return res
                .status(404)
                .send({ message: "ins with given email does not exist!" });

        let token = await Token.findOne({ insId: ins._id });
        if (!token) {
            token = await new Token({
                instructorId: ins._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        const url = `${process.env.BASE_URL}/instructor/password-reset/${ins._id}/${token.token}`;
        await SendEmail(ins.email, "Password Reset", url);

        res
            .status(200)
            .send({ message: "Password reset link sent to your email account" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

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
        const user = await Instructors.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {
                const user = await Instructors.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
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
    instructorRegister,
    instructorLogin,
    instructorContactUS,
    ResetPassword,
    instructorFeedback,
    instructorAllUser,
    getInstructor,
    getInstructorById,
    deleteInstrucror,
    updateInstructor,
    saveInstructor,
    InsForgotPassword,
    InsForgotPasswordForm,
    resetPwdLink
}