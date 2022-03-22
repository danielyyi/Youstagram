import React, { useContext, useState, useEffect } from "react";
import {ChromePicker} from "react-color";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import astro from "../astro.jpg";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../util/hooks";
import {FETCH_POSTS_QUERY} from '../util/graphql'
import FileBase from 'react-file-base64'


function MakePost(props) {
  const { user, logout } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    caption: '',
    image: '',
    color:'#fff',
  });

  const [color, setColor] = useState('#fff');
  function changeColor(color){
    values.color = color;
    setColor(color);
  }

  const [image, setImage] = useState('');
  function changeImage(image){
    values.image = image;
    setImage(image);
  }

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

  function createPostCallback(){
    createPost();
    props.history.push("/");
  }

  
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
          <div>
            <FileBase
            type = "file"
            multiple={false}
            onDone = {({base64}) => changeImage(base64)}
            />
          </div>
          <div>
            <ChromePicker color = {color} onChange={({hex}) => changeColor(hex)}/>
          </div>
          <div className="mock-post-holder">
          <MockPost c={values.caption} i={image} color = {color}/>
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
    $image: String!
    $color: String
    ) {
    createPost(
      caption: $caption
      image: $image
      color: $color
      ) {
      id
      caption
      createdAt
      username
      image
      color
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
