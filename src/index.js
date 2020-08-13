import React from "react";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Component/App";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// function logger  (obj,next,action)
//logger(obj)(next)(action)

// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware
//       console.log("ACTION TYPE = ", action.type);
//       next(action);
//     };
//   };
// };

const logger = ({ dispatch, getState }) => (next) => (action) => {
  //   logger code
  if (typeof action !== "function") {
    console.log("ACTION TYPE = ", action.type);
  }

  next(action);
};

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   //   logger code
//   //   console.log("ACTION TYPE = ", action.type);
//   if (typeof action === "function") {
//     action(dispatch);
//     return;
//   }
//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log("Before state", store.getState());
// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "SuperMan" }],
// });
// console.log("After State", store.getState());

ReactDOM.render(<App store={store} />, document.getElementById("root"));
