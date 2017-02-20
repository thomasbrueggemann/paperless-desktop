import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Documents from "./components/Documents";
import Login from "./components/Login";
import DocumentDetail from "./components/DocumentDetail";
import Logs from "./components/Logs";
import Tags from "./components/Tags";
import Correspondents from "./components/Correspondents";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
 		<Route path="/documents" component={Documents} />
		<Route path="/document/:id" component={DocumentDetail} />
		<Route path="/logs" component={Logs} />
		<Route path="/tags" component={Tags} />
		<Route path="/correspondents" component={Correspondents} />
	</Route>
);
