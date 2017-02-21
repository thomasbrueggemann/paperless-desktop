import alt from "../alt";
import DocumentsActions from "../actions/DocumentsActions";

// DOCUMENTS STORE
class DocumentsStore {

	constructor() {
		this.bindActions(DocumentsActions);
		this.documents = [];
		this.correspondent = null;
		this.tag = null;
	}

	// GET DOCUMENTS SUCCESS
  	getDocumentsSuccess(result) {
		this.documents = result.data;
		this.correspondent = result.correspondent;
		this.tag = result.tag;
  	}

	// GET DOCUMENTS FAIL
  	getDocumentsFail(err) {
		console.error(err);
  	}
}

export default alt.createStore(DocumentsStore);
