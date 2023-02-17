import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth";
import ProfileHeaderbar from "../components/ProfileHeaderbar";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {FETCH_POSTS_QUERY} from '../util/graphql'
import Post from "../components/Post";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const {loading, data} = useQuery(FETCH_POSTS_QUERY);
  var posts = {};
  if(!loading){
    posts = [...data.getPosts.filter((post)=>post.username===user.username)];
  }

  return (
    <div className="profile-page">
      <ProfileHeaderbar />
      <div className="fake-profile-headerbar"></div>
      <div className="current-posts">
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
      </div>
      <div style={{ height: 60 }}></div>

      <Navbar />
    </div>
  );
}
export default Profile;
