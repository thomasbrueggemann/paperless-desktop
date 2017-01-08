import alt from "../alt";
import axios from "axios";

// TAGS ACTIONS
class TagsActions {

    constructor() {
        this.generateActions(
            "getTagsSuccess",
            "getTagsFail"
        );
    }

    // GET TAGS
    getTags() {

		var url = localStorage.getItem("settings.host") + "/api/tags/";

		axios({
			"method": "get",
			"url": url,
			"auth": {
				"username": localStorage.getItem("settings.auth.username"),
    			"password": localStorage.getItem("settings.auth.password")
			}
		})
		.then(this.actions.getTagsSuccess)
		.catch(this.actions.getTagsFail);
    }
}

export default alt.createActions(TagsActions);
