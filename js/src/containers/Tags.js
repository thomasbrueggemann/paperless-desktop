import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import $ from "jquery";
import PaperlessComponent from "../components/PaperlessComponent";
import ToolbarActions from "../actions/ToolbarActions";
import TagsListItem from "../components/TagsListItem";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class Tags extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TagsStore.getState();
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
		$(window).trigger("header.activeItem", { item: "tags" });

		// EVENT: tagAdded
		ipcRenderer.on("tagAdded", (e, data) => {
			// add the newly created tag to the store
			var tags = this.state.tags;
			if (tags) {
				tags.results.push(data);

				this.setState({
					tags: tags
				});
			}
		});

		TagsStore.listen(this.onChange);
		TagsActions.getTags();

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: add button
		ToolbarActions.addItem("add-tag", "plus", "Add tag", "primary", "right", () => {
			// add correspondent
			ipcRenderer.send("modal", {
				route: "/modal/tags/add",
				width: 450,
				height: 545
			});
		});
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		// clear toolbar to add new items
		ToolbarActions.clearItems();

		TagsStore.unlisten(this.onChange);
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
			message = "Are you sure you want to delete this tag?";
		}

		if (this.state.selection.length > 1) {
			message = "Are you sure you want to delete these tags?";
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
			TagsActions.deleteTags(this.state.selection);

			this.setState({
				selection: []
			});
		}
	}

	// UPDATE TAG
	updateTag(data) {
		TagsActions.editTag(data);
	}

	// RENDER
	render() {
		if (!this.state.tags || !("results" in this.state.tags)) return null;

		return (
			<div className="pane">
				<table className="table-striped">
					<thead>
						<tr>
							<th />
							<th>Color</th>
							<th>Name</th>
							<th>Match</th>
							<th>Matching Algorithm</th>
						</tr>
					</thead>
					<tbody>
						{this.state.tags.results.map((t) => {
							return (
								<TagsListItem
									key={"tags_" + t.id}
									tag={t}
									changeSelection={this.changeSelection.bind(this)}
									updateTag={this.updateTag.bind(this)}
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
Tags.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default Tags;
