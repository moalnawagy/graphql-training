const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,

} = require('graphql');
const controller = require("./controller/auth")

const authSchema = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: "authQuery",
        description: "auth query",
        fields: {
            helloAuth: {
                type: GraphQLString,
                resolve: () => {
                    return 'Mute The Auth Not Query'
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "authMutation",
        description: "auth query mutation",
        fields: {
            signup: controller.signup,
            signin: controller.signin,
            confirmEmail: controller.confirmEmailCont
        }
    })
})

module.exports = authSchema