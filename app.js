const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const app = express()
require('dotenv').config()

app.use(express.json())
const port = process.env.PORT


const connectDB = require('./DB/connection');

const schema = require("./modules/index.schema")


app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema.rootSchema,
        graphiql: true,
    }),
);



app.use(
    '/auth',
    graphqlHTTP({
        schema: schema.authSchema,
        graphiql: true,
    }),
);

app.use(
    '/blog',
    graphqlHTTP({
        schema: schema.blogSchema,
        graphiql: true,
    }),
);


app.use(
    '/user',
    graphqlHTTP({
        schema: schema.userScheam,
        graphiql: true,
    }),
);



connectDB()
app.listen(port, () => console.log(`App listening on port ${port}!`))