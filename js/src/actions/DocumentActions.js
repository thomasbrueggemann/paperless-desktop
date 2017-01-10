import alt from "../alt";
import axios from "axios";

// DOCUMENT ACTIONS
class DocumentActions {

    constructor() {
        this.generateActions(
            "getDocumentSuccess",
            "getDocumentFail"
        );
    }

	// GET DOC
	getDocument(id) {
		var url = localStorage.getItem("settings.host") + "/api/documents/" + id;

		// fetch documents
		axios({
			"method": "get",
			"url": url,
			"auth": {
				"username": localStorage.getItem("settings.auth.username"),
    			"password": localStorage.getItem("settings.auth.password")
			}
		})
		.then(this.actions.getDocumentSuccess)
		.catch(this.actions.getDocumentFail);
	}
}

export default alt.createActions(DocumentActions);
