import { SET_CURRENT_USER, USER_LOADING, SET_CURRENT_ADMIN, ADMIN_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  isAdminAuthenticated: false,
  admin: {},
  adminLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAdminAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    case ADMIN_LOADING:
      return {
        ...state,
        adminLoading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
