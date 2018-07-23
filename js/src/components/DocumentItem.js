import React from "react";
import { Link } from "react-router";
import PaperlessComponent from "./PaperlessComponent";
import moment from "moment";
import TagsStore from "../stores/TagsStore";
import TagDot from "./TagDot";

String.prototype.trunc =
	String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
	};

class DocumentItem extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TagsStore.getState();
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
		var tags = [];
		this.state.tags.results.map((tag) => {
			tags[tag.id] = tag;
		});
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
					&nbsp;
					{this.props.document.tags.map((tagUrl) => {
						var tagRegex = /\/([0-9]+)\//;
						var tagId = tagRegex.exec(tagUrl)[1];
						var tag = tags[tagId];
						return (
							<TagDot
								tag={tag}
								key={"sidebar_tags_" + tag.id}
								setTagFilter={this.props.setTagFilter}
							/>
						);
					})}
				</div>
				<small>{moment(this.props.document.created).format("LLLL")}</small>
			</Link>
		);
	}
}

export default DocumentItem;
