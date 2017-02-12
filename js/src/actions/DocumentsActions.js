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
    getDocuments(correspondent, tag) {

		var toQueryString = function(obj) {
		    var parts = [];
		    for (var i in obj) {
		        if (obj.hasOwnProperty(i) && obj[i]) {
		            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
		        }
		    }
		    return parts.join("&");
		};

		var url = localStorage.getItem("settings.host") + "/api/documents/";

		// add parameters to url
		var parameters = toQueryString({
			"correspondent__slug_0": correspondent,
			"correspondent__slug_1": "contains",
			"tags__slug_0": tag,
			"tags__slug_1": "contains",
			"ordering": "-created"
		});

		// attach parameters if availble
		if(parameters.length > 0) {
			url += "?" + parameters;
		}

		// fetch documents
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

	// SEARCH DOCUMENTS
	searchDocuments(query) {

		var url = localStorage.getItem("settings.host") + "/api/documents/?search=" + query;

		// fetch documents
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
		.then(this.actions.getDocumentsSuccess)
		.catch(this.actions.getDocumentsFail);
	}
}

export default alt.createActions(DocumentsActions);
