import React from "react";
import DocumentActions from "../actions/DocumentActions";
import DocumentsActions from "../actions/DocumentsActions";
import DocumentStore from "../stores/DocumentStore";
import Sidebar from "../components/Sidebar";
import spdf from "simple-react-pdf2";
import PaperlessComponent from "../components/PaperlessComponent";
import DocumentDetailForm from "../components/DocumentDetailForm";
import ToolbarActions from "../actions/ToolbarActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

class DocumentDetail extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		DocumentStore.listen(this.onChange);
		DocumentActions.getDocument(this.props.params.id);

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: save button
		ToolbarActions.addItem("save-detail", "floppy", "Save", "primary", "right", (e) => {
			e.preventDefault();
			this.saveDocument();
		});

		// toolbar: download file
		ToolbarActions.addItem(
			"download-file",
			"download",
			"Download File",
			"default",
			"left",
			() => {
				// downstream the download command
				if (this.state.doc.download_url) {
					ipcRenderer.send("download", {
						url: super.getHost() + this.state.doc.download_url.replace("\\", "")
					});
				}
			}
		);

		// toolbar: delete document
		ToolbarActions.addItem("add-reminder", "bell", "Add reminder", "default", "right", () => {
			// add correspondent
			ipcRenderer.send("modal", {
				route: "/modal/reminders/add/" + this.props.params.id,
				width: 450,
				height: 350
			});
		});

		// toolbar: delete document
		ToolbarActions.addItem(
			"delete-document",
			"trash",
			"Delete document",
			"default",
			"right",
			() => {
				// ask user if he really wants to delete the document
				var choice =
					dialog.showMessageBox(remote.getCurrentWindow(), {
						type: "question",
						buttons: ["Yes", "No"],
						title: "It'll be gone forever!",
						message: "Are you sure you want to delete this document?"
					}) === 0;

				// yes, delete this thing!
				if (choice === true) {
					DocumentsActions.deleteDocuments([this.props.params.id]);

					// reload documents store
					DocumentsActions.getDocuments();

					// emit event to close this tab, since the document is just deleted
					$(window).trigger("tabs.closeCurrent");
				}
			}
		);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ToolbarActions.clearItems();
		DocumentStore.unlisten(this.onChange);
	}

	// COMPONENT WILL UPDATE
	componentWillUpdate(nextProps, nextState) {
		// something changed in the state id
		if (nextProps.params.id !== this.props.params.id) {
			this.setState({
				doc: null
			});

			// fetch new document
			DocumentActions.getDocument(nextProps.params.id);
		}
	}

	// SHOULD COMPONENT UPDATE
	shouldComponentUpdate(nextProps, nextState) {
		try {
			return (
				nextState.doc.id !== this.state.doc.id ||
				nextProps.params.id !== this.props.params.id
			);
		} catch (e) {
			return true;
		}
	}

	// ON CHANGE
	onChange(state) {
		// add new tab
		$(window).trigger("tabs.push", {
			title: state.doc.title,
			route: "/document/" + this.props.params.id
		});

		this.setState(state);
	}

	// SAVE DOCUMENT
	saveDocument() {
		DocumentActions.updateDocument(this.state.doc);
	}

	// CHANGE DOC
	changeDoc(doc) {
		this.setState({
			doc: doc
		});
	}

	// RENDER
	render() {
		// render nothing if document is empty
		if (!this.state.doc) return null;

		return (
			<div className="pane-group">
				<div className="pane-two-third">
					<spdf.SimplePDF
						file={super.getHost() + this.state.doc.download_url.replace("\\", "")}
					/>
				</div>
				<div className="pane pane-one-third">
					<DocumentDetailForm
						doc={this.state.doc}
						changeDoc={this.changeDoc.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default DocumentDetail;
