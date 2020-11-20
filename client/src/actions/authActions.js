import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      const Data = {
        _id: res.data._id,
        isValid: false,
      };

      const newData = Object.assign(Data, userData);

      axios.post("/verify/send", newData).catch(err => console.log(err))

      if (userData.type === "Artist") {
        axios.post("/api/artists/registerArtist", newData).catch(err => console.log(err))
      }
      
      // if (userData.type === "Client") {
      //   axios.post("/api/clients/addClient", res.data)
      //   .catch(err => console.log(err))
      // }
      // if (userData.type === "Admin") {
      //   axios.post("/api/admins/addAdmin", res.data)
      //   .catch(err => console.log(err))
      // }
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
};

// Update User
export const updateUser = (userData) => dispatch => {
  axios
    .post("/api/users/update", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Change Password
export const updatePassword = (userData) => dispatch => {
  axios
    .post("/api/users/updatePassword", userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = (userData) => dispatch => {
  axios.post("/api/users/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
  ;
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const restorePassword = (user) => dispatch => {
  axios.post("/verify/ForgotPassword", user)
    .catch(err => 
      dispatch({
        type: "GET_ERRORS",
        payload: err
      })
    )
}