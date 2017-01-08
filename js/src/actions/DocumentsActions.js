import alt from "../alt";
import axios from "axios";

// DOCUMENTS ACTIONS
class DocumentsActions {

    constructor() {
        this.generateActions(
            "getDocumentsSuccess",
            "getDocumentsFail"
        );
    }

    // GET DOCS
    getDocuments() {

		var url = localStorage.getItem("settings.host") + "/api/documents/";

		axios({
			"method": "get",
			"url": url,
			"auth": {
				"username": localStorage.getItem("settings.auth.username"),
    			"password": localStorage.getItem("settings.auth.password")
			}
		})
		.then(this.actions.getDocumentsSuccess)
		.catch(this.actions.getDocumentsFail);
    }
}

export default alt.createActions(DocumentsActions);
