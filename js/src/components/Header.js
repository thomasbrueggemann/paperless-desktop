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
			  <h1 className="title">Header with actions</h1>

			  <div className="toolbar-actions">
			    <div className="btn-group">
			      <button className="btn btn-default">
			        <span className="icon icon-home"></span>
			      </button>
			      <button className="btn btn-default">
			        <span className="icon icon-folder"></span>
			      </button>
			      <button className="btn btn-default active">
			        <span className="icon icon-cloud"></span>
			      </button>
			      <button className="btn btn-default">
			        <span className="icon icon-popup"></span>
			      </button>
			      <button className="btn btn-default">
			        <span className="icon icon-shuffle"></span>
			      </button>
			    </div>

			    <button className="btn btn-default">
			      <span className="icon icon-home icon-text"></span>
			      Filters
			    </button>

			    <button className="btn btn-default btn-dropdown pull-right">
			      <span className="icon icon-megaphone"></span>
			    </button>
			  </div>
			</header>

		);
	}
}

export default Header;
