const joi = require("joi")
joi.objectId = require('joi-objectid')(joi);

const updatePasswordVal = joi.object({

    email: joi.string().email().required(),
    token: joi.string().required(),
    oldPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    newPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    CnewPassword: joi.string().valid(joi.ref('newPassword')),
})
const sendCodeVal = joi.object({

    email: joi.string().email().required(),

})
const resetPassword = joi.object({

    email: joi.string().email().required(),
    newPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    CnewPassword: joi.string().valid(joi.ref('newPassword')),
    code: joi.number()
})
const deleteUser = joi.object({

    id: joi.objectId().required(),
    token: joi.string().required(),
})
module.exports = {
    updatePasswordVal,
    sendCodeVal,
    resetPassword,
    deleteUser
}