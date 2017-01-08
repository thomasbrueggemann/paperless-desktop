import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Documents from "./components/Documents";
import Login from "./components/Login";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
 		<Route path="/documents" component={Documents} />
	</Route>
);
