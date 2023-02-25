const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const resetTokenSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }

})

resetTokenSchema.pre('save', async function(next) {
    if (this.isModified('token')) {
        this.token = await bcrypt.hash(this.token, 8)
    }
    next()
})

resetTokenSchema.methods.compareToken = async function(token) {
    const result = await bcrypt.compareSync(token, this.token)
    return result
}

module.exports = mongoose.model('ResetToken', resetTokenSchema)