import gql from 'graphql-tag'
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