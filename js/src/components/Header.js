import React from "react";

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
						<button className="btn btn-default active" title="Documents">
							<span className="icon icon-newspaper"></span>
						</button>
						<button className="btn btn-default" title="Tags">
							<span className="icon icon-tag"></span>
						</button>
					</div>

					<div className="btn-group">
						<button className="btn btn-default">
							<span className="icon icon-cog"></span>
						</button>
						<button className="btn btn-default" title="Logs">
							<span className="icon icon-menu"></span>
						</button>
					</div>
			  	</div>
			</header>

		);
	}
}

export default Header;
