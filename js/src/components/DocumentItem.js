import React from "react";
import {Link} from "react-router";
import PaperlessComponent from "./PaperlessComponent";
import axios from "axios";

class DocumentItem extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = {};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		var that = this;

		super.getDataUri(super.getHost() + this.props.document.thumbnail_url.replace("\\", ""), function(result) {
			that.setState({
				"data": result
			});
		});
	}

	// RENDER
	render() {

		var divStyle = {};

		if("data" in this.state) {
			divStyle["backgroundImage"] = "url(" + this.state.data + ")";
		}

		return (
			<Link className="document-item" to={"/document/" + this.props.document.id}>
				<div className="document-item-thumbnail" style={divStyle}></div>
				<div className="document-item-title">{this.props.document.title}</div>
			</Link>
		);
	}
}

export default DocumentItem;
