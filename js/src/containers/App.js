import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabs from "../components/Tabs";
import RemindersNotification from "../components/RemindersNotification";
import FileDrop from "react-file-drop";
import PaperlessComponent from "../components/PaperlessComponent";
import axios from "axios";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class App extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props, context) {
		super(props, context);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		// EVENT: open document
		ipcRenderer.on("openDocument", (e, data) => {
			this.context.router.push("/document/" + data);
		});
	}

	handleDrop(files) {
		for (var ii = 0, len = files.length; ii < len; ii++) {
			var file = files[ii];
			const data = new FormData();
			data.append("document", file);
			data.append("title", file.name);

			var url = localStorage.getItem("settings.host") + "/push";

			axios.post(url, data, {
				auth: {
					username: localStorage.getItem("settings.auth.username"),
					password: localStorage.getItem("settings.auth.password")
				},
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
		}

		var notif = new window.Notification("Documents uploading..", {
			body: "They will appear in your document list once they have finished processing."
		});
	}

	// RENDER
	render() {
		return (
			<div className="window">
				<RemindersNotification />
				<Header history={this.props.history} />
				<Tabs history={this.props.history} />
				<FileDrop onDrop={this.handleDrop}>Drop some files here!</FileDrop>
				<div className="window-content">{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

// CONTEXT TYPES
App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default App;
