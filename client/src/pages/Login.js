import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import {AuthContext} from '../context/auth'

function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) {
      console.log(userData);
      context.login(userData)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div>
      <h2>Youstagram</h2>
      <form onSubmit={onSubmit} noValidate>
        <input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          
          onChange={onChange}
        />
        <input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
         
          onChange={onChange}
        />
        <button type="submit">Login</button>
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
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
      bio
    }
  }
`;
export default Login;
