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
const hello = {
    type: GraphQLString,

    resolve: () => {
        return "Welcome GraphQL"
    }
}



const helloBool = {
    type: GraphQLBoolean,
    resolve: () => {
        return true
    }
}


module.exports = {
    hello,helloBool
}