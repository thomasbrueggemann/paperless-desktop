import alt from "../alt";
import axios from "axios";

// CORRESPONDENTS ACTIONS
class CorrespondentsActions {

    constructor() {
        this.generateActions(
            "getCorrespondentsSuccess",
            "getCorrespondentsFail"
        );
    }

    // GET TAGS
    getTags() {

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
}

export default alt.createActions(CorrespondentsActions);
