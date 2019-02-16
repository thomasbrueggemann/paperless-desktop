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

// hot reload for development
import { AppContainer } from "react-hot-loader";

import App from "./App";
import TagsContext from "./contexts/TagsContext";

import "./styles/style.scss";
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

const root = document.getElementById("root");

const render = (AppComponent) => {
	ReactDOM.render(
		<AppContainer>
			<TagsContext.ContextProvider>
				<AppComponent />
			</TagsContext.ContextProvider>
		</AppContainer>,
		root
	);
};

render(App);

if (module.hot) {
	module.hot.accept("./App", () => {
		render(App);
	});
}
