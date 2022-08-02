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
const controller = require("./controller/user")
const userScheam = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: "userQuery",
        description: "",
        fields: {
            getProfile: controller.profile,
            getAll: controller.getAll,
            getUserByID: controller.getUserByID
        }

    }),
    mutation: new GraphQLObjectType({
        name: "userMutation",
        description: "",
        fields: {
            updateProfile: controller.updateProfile,
            deleteProfile: controller.deleteUser,
            updatePass: controller.updatePassword,
            sendResetCode: controller.sendCode,
            resetPass: controller.resetPassword

        }
    })
})

module.exports = userScheam