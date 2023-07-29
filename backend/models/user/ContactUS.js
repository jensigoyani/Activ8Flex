const mongoose = require('mongoose')

const contactUS = mongoose.Schema({
    name : {
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        trim: true,
        lowercase: true,
        required: true
    },
    question:{
        type:String,
        require:true
    }
},{
    timestamps: true
})

const ContactUS = mongoose.model('ContactUS', contactUS);
module.exports = ContactUS