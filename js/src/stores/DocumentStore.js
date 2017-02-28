import alt from "../alt";
import $ from "jquery";
import DocumentActions from "../actions/DocumentActions";
import Store from "./Store";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

// DOCUMENT STORE
class DocumentStore extends Store {
    constructor() {
        super();
        this.bindActions(DocumentActions);
        this.doc = null;
    }

    // GET DOCUMENT SUCCESS
    getDocumentSuccess(result) {
        this.doc = result.data;
    }

    // GET DOCUMENT FAIL
    getDocumentFail(err) {
        if (err.response && err.response.status === 403) {
            super.goBackToLogin();
        }

        console.error(err);
        dialog.showErrorBox("Could not load document!", "Please try again.");
    }

    // UPDATE DOCUMENT SUCCESS
    updateDocumentSuccess(result) {
        console.log(result);

        if (result.data) {
            $(window).trigger("tabs.setActiveTitle", {
                title: result.data.title
            });
        }
    }

    // UPDATE DOCUMENT FAIL
    updateDocumentFail(err) {
        if (err.response && err.response.status === 403) {
            super.goBackToLogin();
        }

        console.error(err);
    }
}

export default alt.createStore(DocumentStore);
