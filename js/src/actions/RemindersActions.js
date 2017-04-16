import alt from "../alt";
import axios from "axios";

// REMINDERS ACTIONS
class RemindersActions {

    constructor() {
        this.generateActions(
            "getRemindersSuccess",
            "getRemindersFail"
        );
    }

    // GET REMINDERS
    getReminders() {

		var url = localStorage.getItem("settings.host") + "/api/reminders/";

		axios({
			"method": "get",
			"url": url,
			"auth": {
				"username": localStorage.getItem("settings.auth.username"),
    			"password": localStorage.getItem("settings.auth.password")
			}
		})
		.then(this.actions.getRemindersSuccess)
		.catch(this.actions.getRemindersFail);
    }
}

export default alt.createActions(RemindersActions);
