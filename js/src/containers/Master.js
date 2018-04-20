import React from "react";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class Master extends React.Component {
	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("goBackToLogin", this.goBackToLogin.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("goBackToLogin");
	}

	// GO BACK TO LOGIN
	goBackToLogin() {
		localStorage.removeItem("settings.auth.username");
		localStorage.removeItem("settings.auth.password");
		localStorage.removeItem("settings.host");

		ipcRenderer.send("setSize", {
			width: 500,
			height: 520
		});

		if (this.context.router) {
			this.context.router.push("/login");
		}
	}

	// RENDER
	render() {
		return this.props.children;
	}
}

// CONTEXT TYPES
Master.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Master;
