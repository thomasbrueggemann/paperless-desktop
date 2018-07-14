import alt from "../alt";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import ToolbarActions from "../actions/ToolbarActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

// CORRESPONDENTS STORE
class CorrespondentsStore {
	constructor() {
		this.bindActions(CorrespondentsActions);
		this.correspondents = [];
		this.selection = [];
	}

	// GET CORRESPONDENTS SUCCESS
	getCorrespondentsSuccess(result) {
		this.correspondents = result.data;
	}

	// GET CORRESPONDENTS FAIL
	getCorrespondentsFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not load correspondents!", "Please try again.");
	}

	// DELETE CORRESPONDENTS SUCCESS
	deleteCorrespondentsSuccess(ids) {
		this.selection = [];

		if (this.correspondents.results) {
			this.correspondents.results = this.correspondents.results.filter((t) => {
				return !ids.find((i) => i === t.id);
			});
		}

		// remove the delete button
		window.setTimeout(() => {
			ToolbarActions.removeItem("remove-correspondents");
		}, 0);
	}

	// DELETE CORRESPONDENTS FAIL
	deleteCorrespondentsFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not delete correspondent(s)!", "Please try again.");
	}

	// ADD CORRESPONDENTS SUCCESS
	addCorrespondentSuccess(result) {
		ipcRenderer.send("correspondentAdd", result);
		ipcRenderer.send("closeModal");
	}

	// ADD CORRESPONDENTS FAIL
	addCorrespondentFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox(
			"Could not add the correspondent!",
			"Data might be missing or the correspondent may already exist."
		);
	}

	// EDIT CORRESPONDENT SUCCESS
	editCorrespondentSuccess(result) {
		if (!result.data) return;

		// replace the correspondent with new edited one
		this.correspondents.results = this.correspondents.results.map((c) => {
			if (c.id === result.data.id) return result.data;
			else return c;
		});
	}

	// EDIT CORRESPONDENT FAIL
	editCorrespondentFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox(
			"Could not edit the correspondent!",
			"Data might be missing or the correspondent does not exist anymore."
		);
	}
}

export default alt.createStore(CorrespondentsStore);
