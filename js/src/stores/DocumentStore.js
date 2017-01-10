import alt from "../alt";
import DocumentActions from "../actions/DocumentActions";

// DOCUMENT STORE
class DocumentStore {

	constructor() {
		this.bindActions(DocumentActions);
		this.doc = null;
	}

	// GET DOCUMENT SUCCESS
  	getDocumentSuccess(result) {
		this.doc = result.data;
  	}

	// GET DOCUMENT FAIL
  	getDocumentFail(err) {
		console.error(err);
  	}
}

export default alt.createStore(DocumentStore);
