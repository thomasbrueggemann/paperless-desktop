import alt from "../alt";
import CorrespondentsActions from "../actions/CorrespondentsActions";

// CORRESPONDENTS STORE
class CorrespondentsStore {

	constructor() {
		this.bindActions(CorrespondentsActions);
		this.correspondents = [];
	}

	// GET CORRESPONDENTS SUCCESS
  	getCorrespondentsSuccess(result) {
		this.correspondents = result.data;
  	}

	// GET CORRESPONDENTS FAIL
  	getCorrespondentsFail(err) {
		console.error(err);
  	}

	deleteCorrespondentsSuccess(result) {
		this.selection = [];
	}

	deleteCorrespondentsFail(err) {
		console.error(err);
	}
}

export default alt.createStore(CorrespondentsStore);
