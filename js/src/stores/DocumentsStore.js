import alt from "../alt";
import DocumentsActions from "../actions/DocumentsActions";
import Store from "./Store";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

// DOCUMENTS STORE
class DocumentsStore extends Store {
    constructor() {
        super();
        this.bindActions(DocumentsActions);
        this.documents = [];
        this.correspondent = null;
        this.tag = null;
    }

    // GET DOCUMENTS SUCCESS
    getDocumentsSuccess(result) {
        this.documents = result.data;
        this.correspondent = result.correspondent;
        this.tag = result.tag;
    }

    // GET DOCUMENTS FAIL
    getDocumentsFail(err) {
        if (err.response && err.response.status === 403) {
            super.goBackToLogin();
        }

        dialog.showErrorBox("Could not load documents!", "Please try again.");
    }
}

export default alt.createStore(DocumentsStore);
