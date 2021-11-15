import React from "react";



function Post({c: caption, i: image}) {
  return (
    <div>
      <div className="post">
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <img className="post-image" src={image}  />
        </div>
          <div className="post-caption">{caption}</div>
      </div>
    </div>
  );
}
export default Post;
