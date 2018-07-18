import alt from "../alt";
import DocumentsActions from "../actions/DocumentsActions";
import $ from "jquery";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;

// DOCUMENTS STORE
class DocumentsStore {
    constructor() {
        this.bindActions(DocumentsActions);
        this.documents = [];
        this.correspondent = null;
        this.tag = null;
		this.isLoading = true;
		this.page = 0;
		this.next = null;
    }

	// SET LOADING
	setLoading(state) {
		this.isLoading = state;
	}

	// RESET DOCUMENTS
	resetDocuments() {
		this.page = 0;
		this.documents = [];
	}

    // GET DOCUMENTS SUCCESS
    getDocumentsSuccess(result) {

		// check if a reset is necessary
		if(this.correspondent !== result.correspondent || this.tag !== result.tag || this.ordering !== result.ordering) {
			this.resetDocuments();
		}

		Array.prototype.push.apply(this.documents, result.data.results);
		this.page = this.page + 1;
        this.correspondent = result.correspondent;
        this.tag = result.tag;
		this.isLoading = false;
		this.ordering = result.ordering;
		this.next = result.data.next;
    }

    // GET DOCUMENTS FAIL
    getDocumentsFail(err) {

		this.isLoading = false;

        if (err.response && err.response.status === 403) {
            $(window).trigger("goBackToLogin");
			return;
        }

        dialog.showErrorBox("Could not load documents!", "Please try again.");
    }
}

export default alt.createStore(DocumentsStore);
