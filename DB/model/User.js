const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userScheam = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }],
    code: Number,
    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'User' },


}, {
    timestamps: true
})



userScheam.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 8)

})
const userModel = mongoose.model('User', userScheam)
module.exports = userModel