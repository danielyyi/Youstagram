import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth";
import ProfileHeaderbar from "../components/ProfileHeaderbar";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <ProfileHeaderbar />
      <div className="fake-profile-headerbar"></div>

      <Link to="/">
        <button className="login" onClick={logout}>
          Logout
        </button>
      </Link>

      <Navbar />
    </div>
  );
}
export default Profile;
