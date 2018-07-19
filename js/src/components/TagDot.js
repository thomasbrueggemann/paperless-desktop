import React from "react";
import PaperlessComponent from "./PaperlessComponent";

class TagDot extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
	}

	// RENDER
	render() {
		return (
			<span
				className="icon icon-record"
				title={this.props.tag.name}
				style={{
					color: this.getTagColor(this.props.tag.colour)
				}}
			/>
		);
	}
}

export default TagDot;
