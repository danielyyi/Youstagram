const {gql} = require('apollo-server');
//type definitions (one for each 'type' and then include any use cases for each inside each type definition)
module.exports = gql`
  type User{
      id: ID!
      email: String!
      token: String!
      username: String!
      createdAt: String!
  }
  type Post {
    id: ID!
    caption: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
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
      createPost(caption: String!): Post!
      deletePost(postId: ID!): String!
  }
`;