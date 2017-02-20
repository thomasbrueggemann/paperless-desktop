import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";
import $ from "jquery";
import PaperlessComponent from "./PaperlessComponent";

class Correspondents extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = CorrespondentsStore.getState();
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
		$(window).trigger("header.activeItem", {"item": "correspondents"});

		CorrespondentsStore.listen(this.onChange);
		CorrespondentsActions.getTags();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		CorrespondentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(!this.state.correspondents || !("results" in this.state.correspondents)) return null;

		return (
			<div className="pane">
				<table className="table-striped">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Match</th>
							<th>Matching Algorithm</th>
						</tr>
					</thead>
					<tbody>

					{this.state.correspondents.results.map(c => {
						return (
							<tr key={c.id}>
								<td><input type="checkbox" /></td>
								<td>{c.name}</td>
								<td>{c.match}</td>
								<td>{c.matching_algorithm}</td>
							</tr>
						);
					})}

					</tbody>
				</table>
			</div>
		);
	}
}

export default Correspondents;
