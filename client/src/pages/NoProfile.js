import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NoProfile() {
  return (
    <>
    <div >
      <div className="post-form-holder">
        <h3>You're not logged in...</h3>
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
      </div>
      <div className="post-form-holder">
        <div>Don't have an account?</div>
        <Link to="/register">
          <button className="login">Sign Up</button>
        </Link>
      </div>
      </div>
      <Navbar />
    
    </>
  );
}
export default NoProfile;
