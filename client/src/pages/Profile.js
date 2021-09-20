import React from "react";
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar';

function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>

      <Link to="/login">
        <div>Login</div>
      </Link>
      <Link to="/register">
        <div>Register</div>
      </Link>
      <Navbar />
    </div>
  );
}
export default Profile;
