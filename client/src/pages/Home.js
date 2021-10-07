import React from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import Post from "../components/Post";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

function Home() {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    var posts = {};
    if(!loading){
        console.log(data)
        posts = data.getPosts
    }
      
  return (
    <div>
      <Headerbar />
      <div className="fake-headerbar"></div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        posts &&
        posts.map((post) => (
          <div className="post-holder" key={post.id}>
            <Post post={post} />
          </div>
        ))
      )}
      
      <div style={{ height: 75 }}></div>
      <Navbar />
    </div>
  );
}
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      caption
      imagePath
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
export default Home;
