const postsResolvers = require('./posts')
const usersResolvers = require('./users')
//imports our posts and users resolvers into one file so the main index.js file can easily access them
module.exports = {
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation
    }
}