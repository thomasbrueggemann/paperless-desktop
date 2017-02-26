import alt from "../alt";
import axios from "axios";

// CORRESPONDENTS ACTIONS
class CorrespondentsActions {

    constructor() {
        this.generateActions(
            "getCorrespondentsSuccess",
            "getCorrespondentsFail",
            "deleteCorrespondentsSuccess",
            "deleteCorrespondentsFail"
        );
    }

    // GET CORRESPONDENTS
    getCorrespondents() {

		var url = localStorage.getItem("settings.host") + "/api/correspondents/";

		axios({
			"method": "get",
			"url": url,
			"auth": {
				"username": localStorage.getItem("settings.auth.username"),
    			"password": localStorage.getItem("settings.auth.password")
			}
		})
		.then(this.actions.getCorrespondentsSuccess)
		.catch(this.actions.getCorrespondentsFail);
    }

	// DELETE CORRESPONDENTS
	deleteCorrespondents(ids) {

		var that = this;

		// asyncroniously delete all document ids
		async.every(ids, function(id, callback) {

			var url = localStorage.getItem("settings.host") + "/api/tags/" + id;

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
				return that.actions.deleteCorrespondentsFail(err);
			}

		    // if result is true then every file exists
			return that.actions.deleteCorrespondentsSuccess(result);
		});
	}
}

export default alt.createActions(CorrespondentsActions);
