import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import astro from "../astro.jpg";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../util/hooks";
import {FETCH_POSTS_QUERY} from '../util/graphql'

function MakePost(props) {
  const caption = "";
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    caption: caption,
    imagePath: astro
  });

  function createPostCallback(){
    createPost();
    props.history.push("/");
  }

  const { user, logout } = useContext(AuthContext);
 
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      if(data){
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: [result.data.createPost, ...data.getPosts],
          },
        });
        values.caption = "";
      }
      
    },
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="post-form-holder">
          <div>
            <input
              type="text"
              onChange={onChange}
              value = {values.caption}
              className = "temp-input"
              name="caption"
              placeholder="Caption..."
            />
          </div>
          <div className="mock-post-holder">
          <MockPost c={values.caption} i={astro} />
        </div>
        <Link to="/profile">
          <button className="create-button">Cancel</button>
        </Link>
        <button className="create-button" type="submit">
          Post
        </button>



        </div>
        
        
      </form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $caption: String!
    $imagePath: String!
    ) {
    createPost(
      caption: $caption
      imagePath: $imagePath
      ) {
      id
      caption
      createdAt
      username
      imagePath
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default MakePost;
