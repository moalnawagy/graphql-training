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

const userModel = require('../../../DB/model/User');
const { auth } = require('../../../middlwear/auth');
const { userType } = require('../types/user');
const endPoint = require('../user.endPoint');
const { validation } = require('../../../middlwear/validation');
const validators = require('../user.validation')
const bcrypt = require('bcryptjs');
const { UserInputError } = require("apollo-server-express");

const profile = {
    type: userType,
    args: {
        token: {
            type: GraphQLString
        }
    },
    resolve: async(_, args) => {
        const user = await auth(args.token, endPoint.profile)
        const profUser = await userModel.findOne({ _id: user._id })
        profUser.message = "Done"
        return profUser
    }
}

const updatePassword = {
    type: userType,
    args: {
        token: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        oldPassword: {
            type: GraphQLString
        },
        newPassword: {
            type: GraphQLString
        },
        CnewPassword: {
            type: GraphQLString
        },
    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.updatePasswordVal, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const user = await auth(args.token, endPoint.profile)
            const { oldPassword, newPassword } = args

            const match = await bcrypt.compare(oldPassword, user.password)
            if (!match) {
                return { message: "old password incorrect" }
            } else {
                const hashed = await bcrypt.hash(newPassword, parseInt(process.envsaltRound))

                const UpdateUser = await userModel.findOneAndUpdate({ _id: user._id }, { password: hashed }, { new: true })
                UpdateUser.message = "Done"
                return UpdateUser

            }

        }
    }
}
const sendCode = {
    type: GraphQLString,
    args: {
        email: {
            type: GraphQLString
        },

    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.sendCodeVal, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const { email } = args
            const user = await userModel.findOne({ email });
            if (!user) {

                return "in-valid account"
            } else {
                const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
                message = `<p> use this code to update u password  : ${code} </p>`
                await userModel.findByIdAndUpdate(user._id, { code })
                sendingEmail(email, "Reset Your password now", message)
                return "Done"
            }

        }
    }
}

const resetPassword = {
    type: GraphQLString,
    args: {
        email: {
            type: GraphQLString
        },
        newPassword: {
            type: GraphQLString
        },
        CnewPassword: {
            type: GraphQLString
        },
        code: {
            type: GraphQLInt
        },
    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.resetPassword, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            try {
                const { email, newPassword, code } = args

                const user = await userModel.findOne({ email });
                if (!user) {
                    return "in-valid account"
                } else {
                    if (user.code.toString() != code.toString()) {
                        return "wrong code"
                    } else {
                        const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))

                        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword, code: "" })

                        return "Done plz go login"
                    }

                }
            } catch (error) {
                return ` error happened: ${error}`

            }
        }
    }
}
const updateProfile = {
    type: userType,
    args: {
        token: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString

        }
    },
    resolve: async(_, args) => {
        const user = await auth(args.token, endPoint.profile)

        const UpdateUser = await userModel.findOneAndUpdate({ _id: user._id }, { name: args.name }, { new: true })
        UpdateUser.message = "Done"
        return UpdateUser
    }
}

const deleteUser = {
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
        const { value, error } = validation(validators.deleteUser, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const user = await auth(args.token, endPoint.profile)
            const { id } = args
            const found = await userModel.findOne({ _id: id })
            if (!found) {
                return "Sorry But The Email You Are Trying To Delete not Found"
            } else if (user.role == "Admin" || user._id == id) {
                try {
                    result = await userModel.deleteOne({ _id: id }).then(e => {
                        return "Deletd Succefuly"

                    })


                } catch (error) {
                    return `Error happened: ${error}`

                }

            } else {
                return "You arn't Auth"

            }
        }
    }
}


const getAll = {
    type: new GraphQLList(userType),
    args: {
        token: {
            type: GraphQLString
        }
    },
    resolve: async(_, args) => {
        const user = await auth(args.token, endPoint.profile)
        const userList = await userModel.find({})
        return userList
    }
}
const getUserByID = {
    type: userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: async(_, args) => {
        return await userModel.findById(args.id)
    }
}
module.exports = {
    profile,
    updateProfile,
    deleteUser,
    getAll,
    getUserByID,
    updatePassword,
    sendCode,
    resetPassword
}