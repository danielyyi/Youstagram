const {gql} = require('apollo-server');
const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { finished } = require('stream/promises');
//type definitions (one for each 'type' and then include any use cases for each inside each type definition)
module.exports = gql`
  type User{
      id: ID!
      email: String!
      bio: String
      token: String!
      username: String!
      createdAt: String!
  }
  type Post {
    id: ID!
    caption: String!
    image: String!
    color: String
    createdAt: String!
    username: String!
    comments: [Comment]!
    commentCount: Int!
  }
  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Query {
    getPosts: [Post]
    getUsers: [User]
    getPost(postId: ID!): Post
    getUser(id: ID!): User
    getUserByName(username: String!): User
    searchUser(username: String!): User
    
  }
  input RegisterInput{
      username: String!
      password: String!
      confirmPassword: String!
      email: String!
  }
  type Mutation{
      register(registerInput: RegisterInput): User! 
      login(username: String!, password:String!): User!
      createPost(caption: String!, image: String!, color: String): Post!
      deletePost(postId: ID!): String!
      createComment(postId: ID!, body: String!): Post!
      deleteComment(postId: ID!, commentId: ID!): Post!
      editBio(bio: String): User!
  }
`;