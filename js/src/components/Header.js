import React from "react";
import {Link} from "react-router";

class Header extends React.Component {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// RENDER
	render() {

		return (
			<header className="toolbar toolbar-header">
			  	<h1 className="title">Paperless</h1>

			  	<div className="toolbar-actions">
					<div className="btn-group">
						<button className="btn btn-default" title="Correspondents">
							<span className="icon icon-users"></span>
						</button>
						<Link className="btn btn-default active" title="Documents" to={"/documents"}>
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
						<Link className="btn btn-default" title="Logs" to={"/logs"}>
							<span className="icon icon-menu"></span>
						</Link>
					</div>
			  	</div>
			</header>

		);
	}
}

export default Header;
