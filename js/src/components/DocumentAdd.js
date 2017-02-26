import React from "react";
import DocumentActions from "../actions/DocumentActions";
import DocumentsActions from "../actions/DocumentsActions";
import DocumentStore from "../stores/DocumentStore";
import Sidebar from "./Sidebar";
import spdf from "simple-react-pdf";
import PaperlessComponent from "./PaperlessComponent";
import DocumentDetailForm from "./DocumentDetailForm";
import ToolbarActions from "../actions/ToolbarActions";
import $ from "jquery";
import FileDrop from "react-file-drop";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer  = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

class DocumentAdd extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = DocumentStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		DocumentStore.listen(this.onChange);

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: save button
		ToolbarActions.addItem("save-detail", "floppy", "Save", "primary", "right", () => {

		});

		// toolbar: delete document
		ToolbarActions.addItem("cancel-document", null, "Cancel", "default", "left", () => {

			// emit event to close this tab
			$(window).trigger("tabs.closeCurrent");
		});
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ToolbarActions.clearItems();
		DocumentStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// OPEN FILE
	openFile() {
		console.log(dialog.showOpenDialog({properties: ["openFile"]}))
	}

	// RENDER
	render() {

		return (
			<div className="pane-group">
				<div className="pane-two-third">

					<div className="center-center">
						<p className="text-bold">Drop a file here</p>
						<p>or</p>
						<button className="btn btn-default" onClick={this.openFile.bind(this)}>Select a file</button>
					</div>

				</div>
				<div className="pane pane-one-third">
					<DocumentDetailForm doc={{}} />
				</div>
			</div>
		);
	}
}

export default DocumentAdd;
