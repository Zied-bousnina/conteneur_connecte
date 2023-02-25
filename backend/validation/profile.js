const isEmpty = require("./isEmpty")

const validator = require('validator')

module.exports = function validateProfileInput(data) {
    let errors = {}
    data.tel = !isEmpty(data.tel)? data.tel : ""
    data.address = !isEmpty(data.address)? data.address : ""
    data.city = !isEmpty(data.city)? data.city : ""
    data.country = !isEmpty(data.country)? data.country : ""
    data.postalCode = !isEmpty(data.postalCode)? data.postalCode : ""
    // data.bio = !isEmpty(data.bio)? data.bio : ""

    if (validator.isEmpty(data.tel)) {
        errors.tel = "Tel field is required"
    }
    if (validator.isEmpty(data.address)) {
        errors.address = "Address field is required"
    }
    if (validator.isEmpty(data.city)) {
        errors.city = "City field is required"
    }
    if (validator.isEmpty(data.country)) {
        errors.country = "Country field is required"
    }
    if (validator.isEmpty(data.postalCode)) {
        errors.postalCode = "Postal Code field is required"
    }
    // if (validator.isEmpty(data.bio)) {
    //     errors.bio = "Bio field is required"
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


