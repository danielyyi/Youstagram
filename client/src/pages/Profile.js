import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {AuthContext} from '../context/auth'

function Profile() {
  const {user, logout} = useContext(AuthContext);
  return (
    <div>
      
        <h3>Youre logged in!</h3>
        <Link to="/">
          <button className="login" onClick={logout}>Logout</button>
        </Link>
        
      <Navbar />
    </div>
  );
}
export default Profile;
