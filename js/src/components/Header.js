import React from "react";
import {Link} from "react-router";
import $ from "jquery";

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {"active": "documents"};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("header.activeItem", this.handleActiveHeaderChanged.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("header.activeItem");
	}

	// HANDLE ACTIVE HEADER CHANGED
	handleActiveHeaderChanged(e, data) {

		this.setState({
			"active": data.item
		});
	}

	// HANDLE SEARCH INPUT CHANGED
	handleSearchInputChanged(event) {
		var v = event.target.value;

		if(v.length === 0) {
			$(window).trigger("loadAllDocuments");
		}
		else {
			if(v.length > 2) {
				$(window).trigger("searchDocuments", {
					"query": v
				});
			}
		}
	}

	// RENDER
	render() {

		var documentsClass = "btn btn-default";
		if(this.state.active === "documents") documentsClass += " active";

		var logsClass = "btn btn-default";
		if(this.state.active === "logs") logsClass += " active";

		var tagsClass = "btn btn-default";
		if(this.state.active == "tags") tagsClass += " active";

		var correspondentsClass = "btn btn-default";
		if(this.state.active == "correspondents") correspondentsClass += " active";

		return (
			<header className="toolbar toolbar-header">
			  	<h1 className="title">Paperless</h1>

			  	<div className="toolbar-actions">
					<div className="btn-group">
						<Link className={documentsClass} title="Documents" to={"/documents"}>
							<span className="icon icon-newspaper"></span>
						</Link>
						<Link className={correspondentsClass} title="Correspondents" to={"/correspondents"}>
							<span className="icon icon-users"></span>
						</Link>
						<Link className={tagsClass} title="Tags" to={"/tags"}>
							<span className="icon icon-tag"></span>
						</Link>
					</div>

					<div className="btn-group">
						<button className="btn btn-default">
							<span className="icon icon-cog"></span>
						</button>
						<Link className={logsClass} title="Logs" to={"/logs"}>
							<span className="icon icon-menu"></span>
						</Link>
					</div>

					<div className="search-bar pull-right">
						<input type="search" onKeyUp={this.handleSearchInputChanged.bind(this)} className="form-control" placeholder="Search" />
					</div>
			  	</div>
			</header>
		);
	}
}

export default Header;
