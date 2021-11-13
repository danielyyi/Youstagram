import React, { useContext } from "react";
import pfp from "../pfp.png";
import { AuthContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

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
        <button className="post-button">Post +</button>
        <div className="header-right">
        <button className="edit-profile-button">Edit Profile</button>
        <button className="dots-button">···</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderbar;
