/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/

import "@babel/polyfill";

// react dependencies
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./styles/style.scss";
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

const root = document.getElementById("root");

const render = (AppComponent) => {
	ReactDOM.render(<AppComponent />, root);
};

render(App);
