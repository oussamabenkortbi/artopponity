import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootAdminReducer from "./reducersAdmin";

const initialState = {};

const middleware = [thunk];

const storeAdmin = createStore(
  rootAdminReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default storeAdmin;
