const mongoose = require('mongoose')

const feedback = mongoose.Schema({
    name : {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
    },
    feedback:{
        type:String,
        require:true
    }
},{
    timestamps: true
})

const Feedback = mongoose.model('Feedback', feedback);
module.exports = Feedback