import alt from "../alt";
import TagsActions from "../actions/TagsActions";
import otherWindowIPC from "other-window-ipc";

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

	// DELETE TAGS SUCCESS
	deleteTagsSuccess(result) {
		this.selection = [];

		// filter out the deleted tags
		if(this.tags.results) {
			this.tags.results = this.tags.results.filter(t => {
				return ids.indexOf(t.id) === -1;
			});
		}
	}

	// DELETE TAGS FAIL
	deleteTagsFail(err) {
		console.error(err);
	}

	// ADD TAG SUCCESS
	addTagSuccess(result) {

	}

	// ADD TAG FAIL
	addTagFail(err) {
		console.error(err);
	}
}

export default alt.createStore(TagsStore);
