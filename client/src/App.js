import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from './util/AuthRoute'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NoProfile from "./pages/NoProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/search" component={Search} />
        <AuthRoute exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <AuthRoute exact path="/noprofile" component={NoProfile} />
        <AuthRoute exact path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;
