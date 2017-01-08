import alt from "../alt";
import LogsActions from "../actions/LogsActions";

// LOGS STORE
class LogsStore {

	constructor() {
		this.bindActions(LogsActions);
		this.logs = [];
	}

	// GET LOGS SUCCESS
  	getLogsSuccess(result) {
		console.log(result);
		this.logs = result.data;
  	}

	// GET LOGS FAIL
  	getLogsFail(err) {
		console.error(err);
  	}
}

export default alt.createStore(LogsStore);
