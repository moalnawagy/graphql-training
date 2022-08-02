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
const userType = new GraphQLObjectType({
    name: "userType",
    description: "user type",
    fields: {
        message: {
            type: GraphQLString
        },
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString,
            description: "user Name field"
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        confirmEmail: { type: GraphQLBoolean },
        role: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },


    }
})
module.exports = {
    userType
}