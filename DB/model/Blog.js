const mongoose = require('mongoose');
const blogScheam = new mongoose.Schema({
    title: String,
    desc: String,
    price: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },



}, {
    timestamps: true
})


const blogModel = mongoose.model('Blog', blogScheam)
module.exports = blogModel