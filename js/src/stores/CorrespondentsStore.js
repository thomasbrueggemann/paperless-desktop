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

        dialog.showErrorBox(
            "Could not load correspondents!",
            "Please try again."
        );
    }

    // DELETE CORRESPONDENTS SUCCESS
    deleteCorrespondentsSuccess(ids) {
        this.selection = [];

        // filter out the deleted correspondents
        if (this.correspondents.results) {
            this.correspondents.results = this.correspondents.results.filter(
                c => {
                    return ids.indexOf(c.id) === -1;
                }
            );
        }

        // remove the delete button
        ToolbarActions.removeItem("remove-tags");
    }

    // DELETE CORRESPONDENTS FAIL
    deleteCorrespondentsFail(err) {

		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		console.error(err);
        dialog.showErrorBox(
            "Could not delete correspondent(s)!",
            "Please try again."
        );
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

        console.error(err);
        dialog.showErrorBox(
            "Could not add the correspondent!",
            "Data might be missing or the correspondent may already exist."
        );
    }
}

export default alt.createStore(CorrespondentsStore);
