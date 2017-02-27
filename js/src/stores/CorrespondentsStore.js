import alt from "../alt";
import CorrespondentsActions from "../actions/CorrespondentsActions";

// CORRESPONDENTS STORE
class CorrespondentsStore {

	constructor() {
		this.bindActions(CorrespondentsActions);
		this.correspondents = [];
		this.selection = [];
	}

	// GET CORRESPONDENTS SUCCESS
  	getCorrespondentsSuccess(result) {
		this.correspondents = result.data;
  	}

	// GET CORRESPONDENTS FAIL
  	getCorrespondentsFail(err) {
		console.error(err);
  	}

	deleteCorrespondentsSuccess(ids) {
		this.selection = [];

		// filter out the deleted correspondents
		if(this.correspondents.results) {
			this.correspondents.results = this.correspondents.results.filter(c => {
				return ids.indexOf(c.id) === -1;
			});
		}
	}

	deleteCorrespondentsFail(err) {
		console.error(err);
	}
}

export default alt.createStore(CorrespondentsStore);
