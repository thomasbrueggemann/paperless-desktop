import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";
import $ from "jquery";
import PaperlessComponent from "../components/PaperlessComponent";
import ToolbarActions from "../actions/ToolbarActions";
import CorrespondentsListItem from "../components/CorrespondentsListItem";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class Correspondents extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = CorrespondentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).trigger("tabs.replace", {
			idx: 0,
			tab: {
				title: "Tags",
				route: "/tags"
			}
		});
		$(window).trigger("header.activeItem", { item: "correspondents" });

		CorrespondentsStore.listen(this.onChange);
		CorrespondentsActions.getCorrespondents();

		// EVENT: correspondentAdded
		ipcRenderer.on("correspondentAdded", (e, data) => {
			// add the newly created tag to the store
			var correspondents = this.state.correspondents;
			if (correspondents) {
				correspondents.results.push(data);

				this.setState({
					correspondents: correspondents
				});
			}
		});

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: add button
		ToolbarActions.addItem(
			"add-correspondent",
			"plus",
			"Add correspondent",
			"primary",
			"right",
			() => {
				// add correspondent
				ipcRenderer.send("modal", {
					route: "/modal/correspondents/add",
					width: 450,
					height: 280
				});
			}
		);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		// clear toolbar to add new items
		ToolbarActions.clearItems();

		CorrespondentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// CHANGE SELECTION
	changeSelection(id, checked) {
		var selection = this.state.selection || [];

		// push or slice out an element
		if (checked === true) {
			selection.push(id);
		} else {
			selection.splice(selection.indexOf(id), 1);
		}

		this.setState({
			selection: selection
		});

		// adjust toolbar based on selection
		if (selection.length > 0) {
			ToolbarActions.addItem(
				"remove-tags",
				"trash",
				"Delete",
				"default",
				"left",
				this.deleteSelection.bind(this)
			);
		} else {
			ToolbarActions.removeItem("remove-tags");
		}
	}

	// DELETE SELECTION
	deleteSelection() {
		var message;
		if (this.state.selection.length === 1) {
			message = "Are you sure you want to delete this correspondent?";
		}

		if (this.state.selection.length > 1) {
			message = "Are you sure you want to delete these correspondents?";
		}

		if (this.state.selection === 0) return;

		// ask user if he really wants to delete the document
		var choice =
			dialog.showMessageBox(remote.getCurrentWindow(), {
				type: "question",
				buttons: ["Yes", "No"],
				title: "It'll be gone forever!",
				message: message
			}) === 0;

		// yes, delete this thing!
		if (choice === true) {
			CorrespondentsActions.deleteCorrespondents(this.state.selection);

			this.setState({
				selection: []
			});
			2;
		}
	}

	// UPDATE CORRESPONDENT
	updateCorrespondent(data) {
		CorrespondentsActions.editCorrespondent(data);
	}

	// RENDER
	render() {
		if (!this.state.correspondents || !("results" in this.state.correspondents)) return null;

		return (
			<div className="pane">
				<table className="table-striped">
					<thead>
						<tr>
							<th />
							<th>Name</th>
							<th>Match</th>
							<th>Matching Algorithm</th>
						</tr>
					</thead>
					<tbody>
						{this.state.correspondents.results.map((c) => {
							return (
								<CorrespondentsListItem
									key={"correspondent_" + c.id}
									correspondent={c}
									changeSelection={this.changeSelection.bind(this)}
									updateCorrespondent={this.updateCorrespondent.bind(this)}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

// CONTEXT TYPES
Correspondents.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Correspondents;
