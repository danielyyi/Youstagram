import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
function SinglePost(props) {
  console.log(props);
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const [ comment, setComment] = useState('')


  console.log(postId);
  //if it works it works...
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let getPost;
  if (data) {
    getPost = data.getPost;
  }
  //----
  //THE SCREEN REFRESHES WHEN POSTING A COMMENT. THIS CAN BE REMOVED BY NOT WRAPPING IT IN A FORM BUT THEN U CANT USE ENTER BUTTON ON KEYBOARD
  const[submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    
    update(event){
      event.preventDefault()
      setComment("");
      document.getElementById("commentInput").value = "";
    },
    variables: {
      postId,
      body: comment
    }
  })

function deletePostCallback(){
  props.history.push('/');
}


  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      caption,
      image,
      username,
      createdAt,
      color,
      commentCount,
      comments,
    } = getPost;
    console.log(caption);
    console.log(comments);
    postMarkup = (
      <div className="current-posts">
        <div className="post-holder">
          <div>
            <div className="post-user">{username}</div>
            <div className="post" style={{ backgroundColor: `${color}` }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img className="post-image" src={image} alt={"post"} />
              </div>
            </div>
            <div className="post-caption">{caption}</div>
            <div className="post-bottom-holder">
              <div className="post-date">
                {moment(createdAt).format("MMMM Do, YYYY")} (
                {moment(createdAt).fromNow()})
              </div>
              <div className="spacer"></div>

              <div className="comment-icon">
                {commentCount} <FontAwesomeIcon icon={faComments} />
              </div>
              
              
            </div>
            {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/> }
          </div>
          
          <div className="comment-section">
            <div className="comment-label">Comments</div>
            {comments.map(comment => (
                <div className="comment-card" key={comment.id}>
                  <div className="comment-username">{comment.username}:</div>
                  
                  <div className="comment-body">{comment.body}</div>
                  
                  <div className="comment-date">{moment(comment.createdAt).fromNow()}</div>
                  {user && (user.username === comment.username || user.username === username)&& (
                    <DeleteButton postId={id} commentId={comment.id}/>
                  )}
                  
                </div>
              ))}
              {user ? (<div>
                      <p>Post a Comment</p>
                      <form>
                      <input type="text" maxLength="50" size="10" id="commentInput" onChange={event => setComment(event.target.value)}/>
                      <button disabled={comment.trim() === ''} onClick={submitComment}>Submit</button>
                      </form>
                    </div>) : (<div>You must be logged in to comment</div>)}
             
            </div>
        </div>
      </div>
    );
  }
  return postMarkup;
}
const SUBMIT_COMMENT_MUTATION = gql`
mutation ($postId: ID!, $body: String!) {
  createComment(postId: $postId, body: $body) {
    id
    comments {
      id body createdAt username
    }
  }
}
`
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      username
      caption
      createdAt
      color
      commentCount
      comments {
        body
        createdAt
        id
        username
      }
    }
  }
`;
export default SinglePost;
