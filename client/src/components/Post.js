import React from "react";
import { Link } from "react-router-dom";
import astro from "../astro.jpg";
import moment from 'moment'
import { Icon } from "semantic-ui-react";

function Post({ post: { caption, createdAt, id, username, commentCount } }) {
  return (
    <div>


      <Link to="/profile">
        <div className="post-user">{username}</div>
      </Link>
      <div className="post">
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <img className="post-image" src={astro} alt={"post"} />
        </div>
        <Link to="/postID">
          <div className="post-caption">{caption}</div>
        </Link>
      </div>

      <div className="post-bottom-holder">
        <div className="post-date">{moment(createdAt).format('MMMM Do, YYYY')} ({moment(createdAt).fromNow(true)})</div>
        <div className="spacer"></div>  
        <div className="comment-icon">{commentCount} <Icon name="comment outline" /></div>
    </div>


    </div>
  );
}
export default Post;
