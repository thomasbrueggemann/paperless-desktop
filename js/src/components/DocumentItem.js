import React from "react";
import {Link} from "react-router";
import PaperlessComponent from "./PaperlessComponent";
import moment from "moment";

String.prototype.trunc = String.prototype.trunc || function(n){
	return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};

class DocumentItem extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = {};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		var that = this;

		// load the image base64 data
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
				<div className="document-item-title">{this.props.document.title.trunc(100)}</div>
				<small
					title={moment(this.props.document.created).format("LLLL")}>
					{moment(this.props.document.created).fromNow()}
				</small>
			</Link>
		);
	}
}

export default DocumentItem;
