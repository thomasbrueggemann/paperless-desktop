import alt from "../alt";
import TagsActions from "../actions/TagsActions";
import ToolbarActions from "../actions/ToolbarActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

// TAGS STORE
class TagsStore {
	constructor() {
		this.bindActions(TagsActions);
		this.tags = [];
	}

	// GET TAGS SUCCESS
	getTagsSuccess(result) {
		this.tags = result.data;
	}

	// GET TAGS FAIL
	getTagsFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not load tags!", "Please try again.");
	}

	// DELETE TAGS SUCCESS
	deleteTagsSuccess(ids) {
		if (this.tags.results) {
			this.tags.results = this.tags.results.filter((t) => {
				return !ids.find((i) => i === t.id);
			});
		}

		// remove the delete button
		window.setTimeout(() => {
			ToolbarActions.removeItem("remove-tags");
		}, 0);
	}

	// DELETE TAGS FAIL
	deleteTagsFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not delete tag(s)!", "Please try again.");
	}

	// ADD TAG SUCCESS
	addTagSuccess(result) {
		ipcRenderer.send("tagAdd", result);
		ipcRenderer.send("closeModal");
	}

	// ADD TAG FAIL
	addTagFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox(
			"Could not add the tag!",
			"Data might be missing or the tag may already exist."
		);
	}

	// EDIT TAG SUCCESS
	editTagSuccess(result) {
		if (!result.data) return;

		// replace the tag with new edited one
		this.tags.results = this.tags.results.map((t) => {
			if (t.id === result.data.id) return result.data;
			else return t;
		});
	}

	// EDIT TAG FAIL
	editTagFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox(
			"Could not edit the tag!",
			"Data might be missing or the tag does not exist anymore."
		);
	}
}

export default alt.createStore(TagsStore);
