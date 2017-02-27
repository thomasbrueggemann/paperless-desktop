import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Modal from "./components/Modal";
import Documents from "./components/Documents";
import Login from "./components/Login";
import DocumentDetail from "./components/DocumentDetail";
import Logs from "./components/Logs";
import Tags from "./components/Tags";
import Correspondents from "./components/Correspondents";
import CorrespondentsAdd from "./components/CorrespondentsAdd";
import TagsAdd from "./components/TagsAdd";

export default (
	<Route path="/">
		<IndexRoute component={Login} />
		<Route path="/" component={App}>
	 		<Route path="/documents" component={Documents} />
			<Route path="/document/:id" component={DocumentDetail} />
			<Route path="/logs" component={Logs} />
			<Route path="/tags" component={Tags} />
			<Route path="/correspondents" component={Correspondents} />
		</Route>
		<Route path="/modal" component={Modal}>
			<Route path="/modal/correspondents/add" component={CorrespondentsAdd} />
			<Route path="/modal/tags/add" component={TagsAdd} />
		</Route>
	</Route>
);
