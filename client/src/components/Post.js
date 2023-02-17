import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import {AuthContext} from '../context/auth'


function Post({ post: { caption, image, color, createdAt, id, username, commentCount } }) {

  const {user} = useContext(AuthContext);


  moment.updateLocale('en', {
    relativeTime : {
        s  : '1 second',
    }
  });
  moment.relativeTimeThreshold('ss', 0);
  return (
    <div >


      <Link to={`/users/${username}`}>
        <div className="post-user">{username}</div>
        
      </Link>
      
      <div className="post" style = {{backgroundColor: `${color}`}}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img className="post-image" src={image} alt={"post"} />
        </div>
          
      </div>
      <Link to={`/posts/${id}`}>
      <div className="post-caption">{caption}</div>
      <div className="post-bottom-holder">
        <div className="post-date">{moment(createdAt).format('MMMM Do, YYYY')} ({moment(createdAt).fromNow()})</div>
        <div className="spacer"></div>  
        
        <div className="comment-icon">{commentCount} <FontAwesomeIcon icon={faComments}/></div>
        
    </div>
    </Link>
    {user && user.username === username && <DeleteButton postId={id}/> }
    </div>
  );
}
export default Post;
