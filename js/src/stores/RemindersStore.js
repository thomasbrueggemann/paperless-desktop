import alt from "../alt";
import RemindersActions from "../actions/RemindersActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

// REMINDERS STORE
class RemindersStore {
    constructor() {
        this.bindActions(RemindersActions);
        this.reminders = [];
    }

    // GET REMINDERS SUCCESS
    getRemindersSuccess(result) {
        this.reminders = result.data;
    }

    // GET REMINDERS FAIL
    getRemindersFail(err) {
		if (err.response && err.response.status === 403) {
            $(window).trigger("goBackToLogin");
			return;
        }

        dialog.showErrorBox("Could not load reminders!", "Please try again.");
    }
}

export default alt.createStore(RemindersStore);
