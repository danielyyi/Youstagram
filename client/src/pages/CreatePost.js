import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import astro from "../astro.jpg";

function MakePost() {
  const { user, logout } = useContext(AuthContext);
  const [caption, setCaption] = useState("caption");

  const [image, setImage] = useState(astro);
  const changeImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <form>
        <div className="post-form-holder">
          <div>
            <input type="file" onChange={changeImage} name="image" />
            <input
              type="text"
              onChange={(e) => setCaption(e.target.value)}
              name="caption"
              placeholder="Caption..."
            />
          </div>
        </div>
        <div className="mock-post-holder">
          <MockPost c={caption} i={image} />
        </div>

        <Link to="/profile">
          <button className="create-button">Cancel</button>
        </Link>
        <button className="create-button" type="submit">Post</button>
      </form>
    </div>
  );
}

export default MakePost;
