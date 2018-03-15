import React from "react";
import { Link } from "react-router";
import PaperlessComponent from "./PaperlessComponent";
import moment from "moment";

String.prototype.trunc =
	String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
	};

class DocumentItem extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		// load the image base64 data
		super.getDataUri(
			super.getHost() + this.props.document.thumbnail_url.replace("\\", ""),
			(result) => {
				this.setState({
					data: result
				});
			}
		);
	}

	// RENDER
	render() {
		var divStyle = {};
		if ("data" in this.state) {
			divStyle["backgroundImage"] = "url(" + this.state.data + ")";
		}

		return (
			<Link className="document-item" to={"/document/" + this.props.document.id}>
				<div className="document-item-thumbnail" style={divStyle} />
				<div className="document-item-title">
					{this.props.document.fresh ? (
						<span
							title="New document"
							className="icon icon-plus-circled text-positive"
						/>
					) : null}
					{this.props.document.fresh ? " " : null}
					{this.props.document.title.trunc(100)}
				</div>
				<small>{moment(this.props.document.created).format("LLLL")}</small>
			</Link>
		);
	}
}

export default DocumentItem;
