import gql from 'graphql-tag'
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      bio
      createdAt
      username
    }
  }
`;
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      caption
      image
      color
      createdAt
      username
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
