import alt from "../alt";
import TagsActions from "../actions/TagsActions";

// TAGS STORE
class TagsStore {

	constructor() {
		this.bindActions(TagsActions);
		this.tags = [];
		this.selection = [];
	}

	// GET TAGS SUCCESS
  	getTagsSuccess(result) {
		this.tags = result.data;
  	}

	// GET TAGS FAIL
  	getTagsFail(err) {
		console.error(err);
  	}

	deleteTagsSuccess(result) {
		this.selection = [];
	}

	deleteTagsFail(err) {
		console.error(err);
	}
}

export default alt.createStore(TagsStore);
