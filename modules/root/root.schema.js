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
const { hello  , helloBool} = require('./controller/root');

const rootSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "rootQuery",
        description: "root query description",
        fields: {

            hello:hello ,
            helloBool:helloBool
        }
    })
})

module.exports = rootSchema