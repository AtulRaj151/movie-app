import React from "react";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Component/App";
import rootReducer from "./reducers";

const store = createStore(rootReducer);
// console.log("Before state", store.getState());
// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "SuperMan" }],
// });
// console.log("After State", store.getState());

ReactDOM.render(<App store={store} />, document.getElementById("root"));
