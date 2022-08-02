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
const signinType = new GraphQLObjectType({

    name: "signInType",
    description: "returns message inicates the status of login operation and if succefully logged in return the token",
    fields: {
        message: {
            type: GraphQLString
        },
        token: {
            type: GraphQLString
        }
    }
})
module.exports = {
    signinType
}