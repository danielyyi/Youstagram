import React from 'react'
import { Link } from 'react-router-dom';

function Register(){
    return(
        <div>
        <h2>Register Page</h2>
        <Link to="/profile">
            Back
        </Link> 
        </div>
    )
}
export default Register;