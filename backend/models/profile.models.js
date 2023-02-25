const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
   
    tel:{
        type:String,
        required:true,
        unique:true
    },
    avatar: String,
    address:"string",
    city:"string",
    country:"string",
    postalCode:"string",
    bio:"string"
}, {timestamps:true})

module.exports = mongoose.model('Profile', profileSchema)
