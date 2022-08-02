const joi = require("joi")


const signup = joi.object({

    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.string().valid(joi.ref('password')),
})


const signin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
})

const confirmEmail = joi.object({
    token: joi.string().required(),
})


module.exports = {
    signup,
    signin,
    confirmEmail
}