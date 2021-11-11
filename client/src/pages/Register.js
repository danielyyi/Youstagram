import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import {AuthContext} from '../context/auth'

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data: {register: userData}}) {
      console.log(userData);
      context.login(userData)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={onSubmit} noValidate>
        <input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          
          onChange={onChange}
        />
        <input
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          
          onChange={onChange}
        />
        <input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          
          onChange={onChange}
        />
        <input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/noprofile">
        <div style={{ color: "white" }}>back</div>
      </Link>
    </div>
  );
}
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
