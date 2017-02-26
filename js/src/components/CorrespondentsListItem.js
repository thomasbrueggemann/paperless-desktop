import React from "react";
import PaperlessComponent from "./PaperlessComponent";

class CorrespondentsListItem extends PaperlessComponent {

	// CHANGE SELECTION
	changeSelection(event) {

		const target = event.target;
		this.props.changeSelection(this.props.correspondent.id, target.checked);
	}

	// RENDER
	render() {

		return (
			<tr>
				<td><input type="checkbox" onChange={this.changeSelection.bind(this)} /></td>
				<td>{this.props.correspondent.name}</td>
				<td>{this.props.correspondent.match}</td>
				<td>{this.props.correspondent.matching_algorithm}</td>
			</tr>
		);
	}
}

export default CorrespondentsListItem;
