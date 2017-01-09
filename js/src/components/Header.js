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
		$(window).on("headerActiveItem", this.handleActiveHeaderChanged.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("headerActiveItem");
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
			this.props.history.push("/documents");
		}
		else {
			this.props.history.push("/documents/search/" + v);
		}
	}

	// RENDER
	render() {

		var documentsClass = "btn btn-default";
		if(this.state.active === "documents") documentsClass += " active";

		var logsClass = "btn btn-default";
		if(this.state.active === "logs") logsClass += " active";

		return (
			<header className="toolbar toolbar-header">
			  	<h1 className="title">Paperless</h1>

			  	<div className="toolbar-actions">
					<div className="btn-group">
						<button className="btn btn-default" title="Correspondents">
							<span className="icon icon-users"></span>
						</button>
						<Link className={documentsClass} title="Documents" to={"/documents"}>
							<span className="icon icon-newspaper"></span>
						</Link>
						<button className="btn btn-default" title="Tags">
							<span className="icon icon-tag"></span>
						</button>
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
						<input type="search" onKeyDown={this.handleSearchInputChanged.bind(this)} className="form-control" placeholder="Search" />
					</div>
			  	</div>
			</header>

		);
	}
}

export default Header;
