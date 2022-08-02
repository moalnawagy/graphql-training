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
const controller = require("./controller/blog")
const blogSchema = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: "BlogQuery",
        description: "",
        fields: {
            addProduct: controller.addProduct,


        }

    }),
    mutation: new GraphQLObjectType({
        name: "BlogMutation",
        description: "",
        fields: {
            addBlog: controller.addProduct,
            deleteBlog: controller.deleteProduct,
            updatingBlog: controller.updateBlog



        }
    })
})

module.exports = blogSchema