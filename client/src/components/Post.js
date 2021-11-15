import React from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";


function Post({ post: { caption, imagePath, createdAt, id, username, commentCount } }) {
  return (
    <div>


      <Link to="/profile">
        <div className="post-user">{username}</div>
      </Link>
      <div className="post">
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <img className="post-image" src={imagePath} alt={"post"} />
        </div>
          <div className="post-caption">{caption}</div>
      </div>

      <div className="post-bottom-holder">
        <div className="post-date">{moment(createdAt).format('MMMM Do, YYYY')} ({moment(createdAt).fromNow()})</div>
        <div className="spacer"></div>  
        <div className="comment-icon">{commentCount} <FontAwesomeIcon icon={faComments}/></div>
    </div>


    </div>
  );
}
export default Post;
