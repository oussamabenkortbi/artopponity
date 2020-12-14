import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentAdmin, setCurrentUser, logoutUser, logoutAdmin } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Error from "./components/layout/Error";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";

import PrivateAdminRoute from "./components/private-route/PrivateAdminRoute";
import AdminDashboard from "./components/layout/Admin/Dashboard";

import PrivateRoute from "./components/private-route/PrivateRoute";
import ProfileRouter from "./components/layout/ProfileRouter";
import EditProfile from "./components/layout/EditProfile";
import ForgotPassword from "./components/layout/ForgotPassword";
import ChangePassword from "./components/layout/Editor/ChangePassword";

import "./App.css";

// Check for token to keep admin or user logged in
if (localStorage.jwtAdminToken) {
  // Set auth token header auth
  const token = localStorage.jwtAdminToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentAdmin(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());
    // Redirect to login
    window.location.href = "./login";
  }
} else if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path = "/" component = {Landing} />
              <Route exact path = "/register" component = {RegisterPage} />
              <Route exact path = "/login" component = {LoginPage} />
              <Route exact path = "/ForgotPassword" component = {ForgotPassword} />
              <Route exact path = "/ChangePassword" component = {ChangePassword} />
              <Route exact path = "/p/:id" component = {ProfileRouter} />
              <PrivateRoute exact path = "/EditProfile" component = {EditProfile} />
              <PrivateAdminRoute exact path = "/AdminDashboard" component = {AdminDashboard} />
              <Route component = {Error} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
