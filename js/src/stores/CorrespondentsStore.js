import alt from "../alt";
import CorrespondentsActions from "../actions/CorrespondentsActions";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

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
		console.error(err);
		dialog.showErrorBox("Could not load correspondents!", "Please try again.");
  	}

	deleteCorrespondentsSuccess(ids) {
		this.selection = [];

		// filter out the deleted correspondents
		if(this.correspondents.results) {
			this.correspondents.results = this.correspondents.results.filter(c => {
				return ids.indexOf(c.id) === -1;
			});
		}
	}

	deleteCorrespondentsFail(err) {
		console.error(err);
		dialog.showErrorBox("Could not delete correspondent(s)!", "Please try again.");
	}
}

export default alt.createStore(CorrespondentsStore);
