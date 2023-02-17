import React from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import Post from "../components/Post";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {FETCH_POSTS_QUERY} from '../util/graphql'

function Home() {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    var posts = {};
    if(!loading){
        posts = data.getPosts
    }
      
  return (
    <div>
      <Headerbar />
      <div className="fake-headerbar"></div>
      <div className="current-posts">
      {loading ? (
        <div className="loader-holder"><div className="loader"></div></div>
      ) : (
        posts &&
        posts.map((post) => (
          <div className="post-holder" key={post.id}>
            <Post post={post} />
          </div>
        ))
      )}
      </div>
      <div style={{ height: 60 }}></div>
      <Navbar />
    </div>
  );
}

export default Home;
