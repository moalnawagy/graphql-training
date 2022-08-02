const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const { sendingEmail } = require("../../../services/sendEmail");
const Blog = require("../../../DB/model/Blog")
const userModel = require('../../../DB/model/User');
const { auth } = require('../../../middlwear/auth');
const { blogType } = require('../types/blogType');
const endPoint = require('../blog.endPoint');
const { validation } = require('../../../middlwear/validation');
const validators = require('../blog.validation')
const { UserInputError } = require("apollo-server-express");



const addProduct = {
    type: blogType,
    args: {
        token: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        desc: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },

    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.addProduct, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const user = await auth(args.token, endPoint.addProduct)

            const { title, desc, price } = args
            const createdBy = user._id
            const found = await Blog.findOne({ title, desc, price, createdBy })
            if (found) {
                return { message: "Sorry But The blog is already added before" }
            } else {
                try {

                    const addingBlog = await Blog.insertMany({ title, desc, price, createdBy })
                    const addingToUser = await userModel.updateOne({ _id: createdBy }, { $addToSet: { "blogs": addingBlog[0]._id.toString() } })
                    addingBlog[0].message = "Done"
                    return addingBlog[0]
                } catch (error) {
                    return {
                        message: `Error Happend: ${error}`,

                    }

                }
            }

        }
    }
}


const updateBlog = {
    type: GraphQLString,
    args: {
        token: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        desc: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },

    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.updateBlog, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const user = await auth(args.token, endPoint.addProduct)

            const { id, title, desc, price } = args
            try {
                const { _id, role } = user
                const found = await Blog.findById(id)

                if (!found || _id.toString() != found.createdBy.toString()) {
                    return "Sorry you can't do this operation"
                } else {
                    const updating = await Blog.findByIdAndUpdate(id, { title, desc, price })
                    return "product has been updated Succefuly"

                }

            } catch (error) {
                return `Error Happend: ${error}`

            }
        }
    }
}


const deleteProduct = {
    type: GraphQLString,
    args: {
        token: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        }

    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.deleteBlog, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const user = await auth(args.token, endPoint.addProduct)

            const { id } = args
            try {
                const { _id, role } = user
                const found = await Blog.findById(id)

                if (!found || (_id.toString() != found.createdBy.toString() && role != "Admin")) {
                    return "Sorry you can't do this operation"
                } else {
                    const deleting = await Blog.deleteOne({ _id: id })
                    return "product has been deleted Succefuly"

                }

            } catch (error) {
                return `Error Happend: ${error}`

            }
        }
    }
}

module.exports = {
    addProduct,
    deleteProduct,
    updateBlog
}