import React from "react";

function Post({c: caption, i: image, color: color}) {
  return (
    <div>
      <div className="post" style={{backgroundColor: `${color}`}} >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10}}>
          <img className="post-image" src={image}  />
        </div>
          <div className="post-caption">{caption}</div>
      </div>
    </div>
  );
}
export default Post;
