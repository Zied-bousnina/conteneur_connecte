const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
    {
       
        name: String,
        email: {
            type: String,
            trim:true,
            unique: true,
            // required: true,
        },
        password: String,   
        role: {
            type: String,
            default: 'USER'
    
        },
        verified: {
            type: Boolean,
            default: false,
            required: true
        },
        activeToken: String,
        activeExpires: Date,
    },{
        timestamps: true
    }
)


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compareSync(password, this.password)
    return result
}

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

module.exports = mongoose.model('User', userSchema)
