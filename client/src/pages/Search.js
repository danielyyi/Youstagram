import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import {FETCH_USERS_QUERY} from '../util/graphql'

function Search() {
    const {loading, data} = useQuery(FETCH_USERS_QUERY);
    var users = {};
    if(!loading){
        users = data.getUsers
        console.log(data.getUsers);
    }


     return (
        <div>
            
         {loading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
        {users.map(user => (
         <li key={user.id}>{user.username}</li>
       ))}
     </ul>
      )}
        <Navbar/>
      </div>
     );
   }
   /*
const SEARCH_USER = gql`
  query searchUser($username: String!) {
    searchUser(username: $username) {
      id
      username
      bio
    }
  }
`;*/

export default Search;
