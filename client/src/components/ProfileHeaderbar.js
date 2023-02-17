import React, { useContext } from "react";
import pfp from "../pfp.png";
import { AuthContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function ProfileHeaderbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="profile-headerbar">
      <div className="profile-header-info">
        <div className="profile-name-bio">
          <div className="profile-name">{user.username}</div>
          <div className="profile-bio">{user.bio}</div>
        </div>
        <img className="pfp" src={pfp} alt={"logo"} />
      </div>
      <div className="profile-header-buttons">
        <Link to="/createpost">
          <button className="post-button">Post +</button>
        </Link>
        <div className="header-right">
          <button className="edit-profile-button">Edit Profile</button>
          <Link to="/">
          <button className="dots-button" onClick={logout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderbar;
