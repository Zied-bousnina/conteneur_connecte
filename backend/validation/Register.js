const isEmpty = require("./isEmpty")

const validator = require('validator')




module.exports = function validateRegisterInput(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirm =!isEmpty(data.confirm) ? data.confirm : ""

    // if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    //     errors.name = "Name must be between 2 and 30 characters"
    // }
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters"
    }
    if (validator.isEmpty(data.confirm)) {
        errors.confirm = "Confirm password field is required"
    }
    if (!validator.equals(data.password, data.confirm)) {
        errors.confirm = "Passwords must match"
    }
    // if (errors.length > 0) {
    //     return {
    //         errors,
    //         isValid: isEmpty(errors)
    //     }
    // }
    return {
        errors,
        isValid: isEmpty(errors)
        }
        

}

