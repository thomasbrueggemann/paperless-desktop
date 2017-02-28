import alt from "../alt";
import LogsActions from "../actions/LogsActions";
import Store from "./Store";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

// LOGS STORE
class LogsStore extends Store {
    constructor() {
        super();
        this.bindActions(LogsActions);
        this.logs = [];
    }

    // GET LOGS SUCCESS
    getLogsSuccess(result) {
        this.logs = result.data;
    }

    // GET LOGS FAIL
    getLogsFail(err) {
        if (err.response && err.response.status === 403) {
            super.goBackToLogin();
        }

        dialog.showErrorBox("Could not load logs!", "Please try again.");
    }
}

export default alt.createStore(LogsStore);
