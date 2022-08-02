const joi = require("joi")
joi.objectId = require('joi-objectid')(joi);

const addProduct = joi.object({

    title: joi.string().required(),
    desc: joi.string().required(),
    token: joi.string().required(),
    price: joi.number().required(),
})
const updateBlog = joi.object({

    title: joi.string().required(),
    desc: joi.string().required(),
    token: joi.string().required(),
    price: joi.number().required(),
    id: joi.objectId().required(),

})
const deleteBlog = joi.object({

    id: joi.objectId().required(),
    token: joi.string().required(),

})

module.exports = {
    addProduct,
    deleteBlog,
    updateBlog
}