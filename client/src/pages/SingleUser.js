import React, {useContext} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth"
import pfp from "../pfp.png";

function SingleUser(props) {
    console.log(props);
  const username = props.match.params.username;
  const { user } = useContext(AuthContext);
  console.log(username);  
  //if it works it works...
  const {
    data,
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username
    }
  });

  let searchUser;
  if(data){
    searchUser = data.searchUser;
  }
  //----
  let postMarkup;
  if (!searchUser) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const { bio, createdAt, email, id, username } = searchUser;
    console.log(username);
    postMarkup = (
        <div>
        <div className="profile-headerbar">
      <div className="profile-header-info">
        <div className="profile-name-bio">
          <div className="profile-name">{username}</div>
          <div className="profile-bio">{bio}</div>
        </div>
        <img className="pfp" src={pfp} alt={"logo"} />
      </div>
      <div className="profile-header-buttons">
      </div>
    </div>
        <div className="fake-profile-headerbar"></div>
        <div className="current-posts">
        </div>
        <div style={{ height: 60 }}></div>
      </div>
    );
  }
  return postMarkup;
}
const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    searchUser(username: $username) {
    bio
    createdAt
    email
    id
    username
    
    }
  }
`;
export default SingleUser;
