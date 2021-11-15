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
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/noprofile" component={NoProfile} />
        <Route exact path="/register" component={Register} />
        <AuthRoute exact path="/createpost" component={CreatePost} />
      </Router>
    </AuthProvider>
  );
}

export default App;
