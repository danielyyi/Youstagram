const { ApolloServer } = require("apollo-server-express");
const express = require('express')
const mongoose = require("mongoose");

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const { MONGODB } = require("./config.js");
const Post = require("./models/Post");
const cors = require('cors')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});
const app = express()

startServer();

async function startServer(){
  await server.start()
  server.applyMiddleware({app})
  app.use(express.static('public'))
  app.use(cors())

  mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");
      return app.listen({ port: 5000 }, ()=>{
        console.log('Server ready at locahost:5000/graphql')
      });
    })
  }
  