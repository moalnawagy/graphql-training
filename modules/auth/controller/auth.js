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
const {
    StatusCodes,
} = require('http-status-codes');

const { sendingEmail } = require("../../../services/sendEmail");
const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken")
const validators = require('../auth.validation')
const bcrypt = require('bcryptjs');
const userModel = require("../../../DB/model/User");
const { signinType } = require('../types/signin');
const { validation } = require('../../../middlwear/validation');

const signup = {
    type: GraphQLString,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
        cPassword: {
            type: new GraphQLNonNull(GraphQLString),
        },

    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.signup, args)
        if (error) {
            throw new UserInputError('validationError', {
                error
            })
        } else {

            try {
                const { name, email, password } = args;

                const find = await userModel.findOne({ email })
                if (!find) {
                    const newUser = new userModel({ name, email, password });
                    const savedUser = await newUser.save()

                    const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.EMAILTOKENSECRET)
                    console.log(token);
                    const sending = await sendingEmail(email, 'verification', `<div>your confirmation token is : ${token} </div>`)
                    return "Created account succefully"
                } else {
                    return "Account Exist"
                }

            } catch (error) {
                if (error.keyValue) {
                    if (error.keyValue.email) {
                        return "Account Exist"
                    }
                } else {
                    return `Error happend: ${error}`
                }

            }
        }
    }
}



const signin = {
    type: signinType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.signin, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const { email, password } = args
            const user = await userModel.findOne({ email });
            if (!user) {
                return { message: "In-valid account" }
            } else {

                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    return { message: "email password misMatch" }
                } else {

                    const token = jwt.sign({ id: user._id },
                        process.env.tokenSignature, { expiresIn: 3600 })
                    return { message: "Done", token }


                }
            }
        }
    }
}
const confirmEmailCont = {
    type: GraphQLString,
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async(_, args) => {
        const { value, error } = validation(validators.confirmEmail, args)
        if (error) {
            throw new UserInputError('ValidationError', {
                error
            })
        } else {
            const { token } = args
            try {
                console.log(token);
                const decoded = await jwt.verify(token, process.env.EMAILTOKENSECRET)
                console.log(decoded);
                const updating = await userModel.updateOne({ _id: decoded.id }, { confirmEmail: true }, { new: true })
                return "confirmed"
            } catch (error) {
                return `Error happened: ${error}`

            }
        }
    }
}
module.exports = {
    signup,
    signin,
    confirmEmailCont
}