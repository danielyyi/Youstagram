import React from "react";
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar';

function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>


      <form action="/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="appImage" />
        <button>Submit</button>
    </form>

      <Navbar />
    </div>
  );
}
export default Profile;
