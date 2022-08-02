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
const blogType = new GraphQLObjectType({
    name: "blogType",
    description: "Blog type",
    fields: {
        message: {
            type: GraphQLString
        },
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString,
            description: "user Name field"
        },
        desc: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },


    }
})
module.exports = {
    blogType
}