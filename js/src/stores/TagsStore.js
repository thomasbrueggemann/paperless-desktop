import alt from "../alt";
import TagsActions from "../actions/TagsActions";
import ToolbarActions from "../actions/ToolbarActions";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer  = electron.ipcRenderer;

// TAGS STORE
class TagsStore {

	constructor() {
		this.bindActions(TagsActions);
		this.tags = [];
		this.selection = [];
	}

	// GET TAGS SUCCESS
  	getTagsSuccess(result) {
		this.tags = result.data;
  	}

	// GET TAGS FAIL
  	getTagsFail(err) {
		console.error(err);
		dialog.showErrorBox("Could not load tags!", "Please try again.");
  	}

	// DELETE TAGS SUCCESS
	deleteTagsSuccess(result) {
		this.selection = [];

		// filter out the deleted tags
		if(this.tags.results) {
			this.tags.results = this.tags.results.filter(t => {
				return ids.indexOf(t.id) === -1;
			});
		}

		// remove the delete button
		ToolbarActions.removeItem("remove-tags");
	}

	// DELETE TAGS FAIL
	deleteTagsFail(err) {
		console.error(err);
		dialog.showErrorBox("Could not delete tag(s)!", "Please try again.");
	}

	// ADD TAG SUCCESS
	addTagSuccess(result) {
		ipcRenderer.send("tagAdd", result);
		ipcRenderer.send("closeModal");
	}

	// ADD TAG FAIL
	addTagFail(err) {
		console.error(err);
		dialog.showErrorBox("Could not add the tag!", "Data might be missing or the tag may already exist.");
	}
}

export default alt.createStore(TagsStore);
