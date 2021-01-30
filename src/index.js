import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createdStore, applyMiddleware, compose, combineReducers } from "redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import HomeScreenReducer from "./store/reducers/HomeScreen";
import MainScreenReducer from "./store/reducers/MainScreen";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  homeScreen: HomeScreenReducer,
  mainScreen: MainScreenReducer,
});

const store = createdStore(rootReducer, composeEnhancers);

ReactDOM.render(
  <BrowserRouter store={store}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
