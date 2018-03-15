import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import Modal from "./components/Modal";
import Documents from "./containers/Documents";
import Login from "./containers/Login";
import DocumentDetail from "./containers/DocumentDetail";
import Logs from "./containers/Logs";
import Tags from "./containers/Tags";
import Correspondents from "./containers/Correspondents";
import CorrespondentsAdd from "./containers/CorrespondentsAdd";
import TagsAdd from "./containers/TagsAdd";
import Settings from "./containers/Settings";
import Master from "./containers/Master";
import Reminders from "./containers/Reminders";
import RemindersAdd from "./containers/RemindersAdd";

export default (
	<Route path="/" component={Master}>
		<IndexRoute component={Login} />
		<Route path="/" component={App}>
			<Route path="/documents" component={Documents} />
			<Route path="/document/:id" component={DocumentDetail} />
			<Route path="/logs" component={Logs} />
			<Route path="/tags" component={Tags} />
			<Route path="/correspondents" component={Correspondents} />
			<Route path="/settings" component={Settings} />
			<Route path="/login" component={Login} />
			<Route path="/reminders" component={Reminders} />
		</Route>
		<Route path="/modal" component={Modal}>
			<Route path="/modal/correspondents/add" component={CorrespondentsAdd} />
			<Route path="/modal/tags/add" component={TagsAdd} />
			<Route path="/modal/reminders/add/:doc" component={RemindersAdd} />
		</Route>
	</Route>
);
