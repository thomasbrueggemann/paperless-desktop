import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import $ from "jquery";
import PaperlessComponent from "./PaperlessComponent";

class Tags extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = TagsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).trigger("tabs.replace", {
			"idx": 0,
			"tab": {
				"title": "Tags",
				"route": "/tags"
			}
		});
		$(window).trigger("header.activeItem", {"item": "tags"});

		TagsStore.listen(this.onChange);
		TagsActions.getTags();

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: add button
		ToolbarActions.addItem("plus", "Add tag", "primary", "right", () => {

			// add tag
		});
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		TagsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(!this.state.tags || !("results" in this.state.tags)) return null;

		return (
			<div className="pane">
				<table className="table-striped">
					<thead>
						<tr>
							<th></th>
							<th>Color</th>
							<th>Name</th>
							<th>Match</th>
							<th>Matching Algorithm</th>
						</tr>
					</thead>
					<tbody>

					{this.state.tags.results.map(t => {
						return (
							<tr key={t.id}>
								<td><input type="checkbox" /></td>
								<td>
									<span className="icon icon-record" style={{
										color: super.getTagColor(t.colour)
									}}></span>
								</td>
								<td>{t.name}</td>
								<td>{t.match}</td>
								<td>{t.matching_algorithm}</td>
							</tr>
						);
					})}

					</tbody>
				</table>
			</div>
		);
	}
}

export default Tags;
