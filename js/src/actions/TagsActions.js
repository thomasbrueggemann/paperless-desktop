import alt from "../alt";
import axios from "axios";
import async from "async";

// TAGS ACTIONS
class TagsActions {
	constructor() {
		this.generateActions(
			"getTagsSuccess",
			"getTagsFail",
			"deleteTagsSuccess",
			"deleteTagsFail",
			"addTagSuccess",
			"addTagFail",
			"editTagSuccess",
			"editTagFail"
		);
	}

	// GET TAGS
	getTags() {
		const url = localStorage.getItem("settings.host") + "/api/tags/?ordering=name";

		axios({
			method: "get",
			url: url,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.getTagsSuccess)
			.catch(this.actions.getTagsFail);
	}

	// DELETE TAGS
	deleteTags(ids) {
		var that = this;

		// asyncroniously delete all document ids
		async.every(
			ids,
			(id, callback) => {
				var url = localStorage.getItem("settings.host") + "/api/tags/" + id;

				// delete document
				axios({
					method: "delete",
					url: url,
					auth: {
						username: localStorage.getItem("settings.auth.username"),
						password: localStorage.getItem("settings.auth.password")
					}
				})
					.then((r) => {
						return callback(null, r);
					})
					.catch((e) => {
						return callback(e);
					});
			},
			(err) => {
				if (err) {
					return that.actions.deleteTagsFail(err);
				}

				// if result is true then every file exists
				return that.actions.deleteTagsSuccess(ids);
			}
		);
	}

	// ADD TAG
	addTag(data) {
		var url = localStorage.getItem("settings.host") + "/api/tags/";

		axios({
			method: "post",
			url: url,
			data: data,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.addTagSuccess)
			.catch(this.actions.addTagFail);
	}

	// EDIT TAG
	editTag(data) {
		var url = localStorage.getItem("settings.host") + "/api/tags/" + data.id + "/";

		axios({
			method: "put",
			url: url,
			data: data,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.editTagSuccess)
			.catch(this.actions.editTagFail);
	}
}

export default alt.createActions(TagsActions);
