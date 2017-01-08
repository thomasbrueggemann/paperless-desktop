import alt from "../alt";
import DocumentsActions from "../actions/DocumentsActions";

// DOCUMENTS STORE
class DocumentsStore {

	constructor() {
		this.bindActions(DocumentsActions);
		this.documents = [];
	}

	// GET DOCUMENTS SUCCESS
  	getDocumentsSuccess(result) {
		this.documents = result.data;
  	}

	// GET DOCUMENTS FAIL
  	getDocumentsFail(err) {
		console.error(err);
  	}
}

export default alt.createStore(DocumentsStore);
