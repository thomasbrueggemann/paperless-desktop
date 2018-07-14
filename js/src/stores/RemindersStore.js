import alt from "../alt";
import RemindersActions from "../actions/RemindersActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

// REMINDERS STORE
class RemindersStore {
	constructor() {
		this.bindActions(RemindersActions);
		this.reminders = [];
	}

	// GET REMINDERS SUCCESS
	getRemindersSuccess(result) {
		this.reminders = result;
	}

	// GET REMINDERS FAIL
	getRemindersFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not load reminders!", "Please try again.");
	}

	// ADD REMINDER SUCCESS
	addReminderSuccess(result) {
		ipcRenderer.send("reminderAdd", result);
		ipcRenderer.send("closeModal");
	}

	// ADD REMINDER FAIL
	addReminderFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not add the reminder!", "Please try again.");
	}

	// REMOVE REMINDER SUCCESS
	removeReminderSuccess(result) {
		var parts = result.request.responseURL.split("/");
		var id = parseInt(parts[parts.length - 2]);

		// filter out the removed reminder
		this.reminders = this.reminders.filter((r) => {
			return r.id !== id;
		});
	}

	// REMOVE REMINDER FAIL
	removeReminderFail(err) {
		if (err.response && err.response.status === 403) {
			$(window).trigger("goBackToLogin");
			return;
		}

		dialog.showErrorBox("Could not remove the reminder!", "Please try again.");
	}
}

export default alt.createStore(RemindersStore);
