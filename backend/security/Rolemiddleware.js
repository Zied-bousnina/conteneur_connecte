const { isValidObjectId } = require("mongoose")
const { sendError } = require("../utils/helper")
// const resetTokenModels = require("../models/resetToken.models")
// const User = require("../models/users.models")
const User = require('../models/userModel.js')
const resetTokenModels = require("../models/resetToken.models");

const ROLES = {
    "ADMIN": 'ADMIN',
    "USER": 'USER',
    "MUNICIPAL": "MUNICIPAL"

}

const isRole = (...roles)=> (req, res, next)=> {
    const role =  roles.find(role=>req.user.role === role.toUpperCase())
    if(!role) return res.status(401).json({message: "no access"})
    next()
    
}

const isResetTokenValid  =async(req, res, 
    next)=> {
    const {token, id} = req.query;
    if(!token || !id)return sendError(res, "Invalid request!");

    if(!isValidObjectId(id)) return sendError(res, "Invalid user!");

    const user = await User.findById(id);
    if(!user) return sendError(res, "User not found!");
    const resetToken = await resetTokenModels.findOne({owner: user._id})
    if(!resetToken) return sendError(res, "reset Token Not found !");
    const isTokenValid = await resetToken.compareToken(token);
    if(!isTokenValid) return sendError(res, "Invalid Token!");

    req.user = user
    next() 
        

}

module.exports = {
    ROLES,
    isRole,
    isResetTokenValid
}