import React from 'react'
import { Link } from 'react-router-dom';

function Login(){
    return(
        <div>
        <h2>Login Page</h2>
        <Link to="/profile">
            Back
        </Link> 
        </div>
    )
}
export default Login;