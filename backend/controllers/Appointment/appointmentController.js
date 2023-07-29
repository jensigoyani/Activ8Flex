const Appointment = require("../../models/Appointment/Appointment")

//take an appointment
const AddAppointMentCollection = async (req, res) => {
    try {
        const newAppointment = new Appointment({ ...req.body, status: "pending" })
        const appointment = await newAppointment.save()
        return res.json({ status: true, appointment });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while taking an appointment"
        })
    }
}

// SHOW APPOINTMENT LIST
const showAppointmentList = async (req, res, next) => {
    Appointment.find((err, val) => {
        if (err) {
            console.log(err);
        } else {
            res.json(val)
        }
    })
}

// GET APPOINTMENT DETAILS
const getAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// FETCH APPOINTMENT BY ID
const getAppointmentById = async (req, res) => {
    try {
        const appo = await Appointment.findById(req.params.id);
        res.json(appo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// SAVE APPOINTMENT
const saveAppointment = async (req, res) => {
    const appo = new Appointment(req.body);
    try {
        const insertedappointment = await appo.save();
        res.status(201).json(insertedappointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// UPDATE APPOINTMENT BY DEATILS
const updateAppointment = async (req, res) => {
    try {
        const updatedappointment = await Appointment.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedappointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE APPOINTMENT
const deleteAppointment = async (req, res) => {
    try {
        const deletedappointment = await Appointment.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedappointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    AddAppointMentCollection,
    showAppointmentList,
    getAppointment,
    getAppointmentById,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}
