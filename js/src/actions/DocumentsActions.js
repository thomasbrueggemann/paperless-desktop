import alt from "../alt";
import axios from "axios";
import async from "async";

// DOCUMENTS ACTIONS
class DocumentsActions {

    constructor() {
        this.generateActions(
            "getDocumentsSuccess",
            "getDocumentsFail",
			"deleteDocumentsSuccess",
			"deleteDocumentsFail",
			"setLoading",
			"resetDocuments"
        );
    }

    // GET DOCS
    getDocuments(correspondent, tag, page = 1) {

		this.actions.setLoading(true);

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
			"ordering": "-created",
			"page": page
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
		.then(result => {
			return this.actions.getDocumentsSuccess({
				"data": result.data,
				"correspondent": correspondent,
				"tag": tag
			});
		})
		.catch(this.actions.getDocumentsFail);
    }

	// SEARCH DOCUMENTS
	searchDocuments(query) {

		this.actions.setLoading(true);
		this.actions.resetDocuments();

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
		.then(result => {
			return this.actions.getDocumentsSuccess({
				"data": result.data,
				"correspondent": null,
				"tag": null
			})
		})
		.catch(this.actions.getDocumentsFail);
	}

	// DELETE DOCUMENT
	deleteDocuments(ids) {

		var that = this;

		// asyncroniously delete all document ids
		async.every(ids, function(id, callback) {

			var url = localStorage.getItem("settings.host") + "/api/documents/" + id;

			// delete document
			axios({
				"method": "delete",
				"url": url,
				"auth": {
					"username": localStorage.getItem("settings.auth.username"),
					"password": localStorage.getItem("settings.auth.password")
				}
			})
			.then(r => {
				return callback(null, r);
			})
			.catch(e => {
				return callback(e);
			});

		}, function(err, result) {

			if(err) {
				return that.actions.deleteDocumentsFail(err);
			}

		    // if result is true then every file exists
			return that.actions.deleteDocumentsSuccess(result);
		});
	}
}

export default alt.createActions(DocumentsActions);
