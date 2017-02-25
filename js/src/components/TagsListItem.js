import React from "react";
import PaperlessComponent from "./PaperlessComponent";

class TagsListItem extends PaperlessComponent {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
	}

	// CHANGE SELECTION
	changeSelection(event) {

		const target = event.target;
		this.props.changeSelection(this.props.tag.id, target.checked);
	}

	// RENDER
	render() {

		return (
			<tr>
				<td><input type="checkbox" onChange={this.changeSelection.bind(this)} /></td>
				<td>
					<span className="icon icon-record" style={{
						color: super.getTagColor(this.props.tag.colour)
					}}></span>
				</td>
				<td>{this.props.tag.name}</td>
				<td>{this.props.tag.match}</td>
				<td>{this.props.tag.matching_algorithm}</td>
			</tr>
		);
	}
}

export default TagsListItem;
