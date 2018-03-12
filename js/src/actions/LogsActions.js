import alt from "../alt";
import axios from "axios";

// LOGS ACTIONS
class LogsActions {
	constructor() {
		this.generateActions("getLogsSuccess", "getLogsFail");
	}

	// GET LOGS
	getLogs() {
		const url = localStorage.getItem("settings.host") + "/api/logs/";

		axios({
			method: "get",
			url: url,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.getLogsSuccess)
			.catch(this.actions.getLogsFail);
	}
}

export default alt.createActions(LogsActions);
