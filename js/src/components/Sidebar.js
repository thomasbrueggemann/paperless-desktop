import React from "react";

class Sidebar extends React.Component {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// RENDER
	render() {

		return (
			<div className="pane pane-sm sidebar">
            <nav className="nav-group">
              <h5 className="nav-group-title">Correspondents</h5>
              <span className="nav-group-item">
                <span className="icon icon-home"></span>
                connors
              </span>
              <span className="nav-group-item active">
                <span className="icon icon-light-up"></span>
                Photon
              </span>
              <span className="nav-group-item">
                <span className="icon icon-download"></span>
                Downloads
              </span>
              <span className="nav-group-item">
                <span className="icon icon-folder"></span>
                Documents
              </span>
              <span className="nav-group-item">
                <span className="icon icon-window"></span>
                Applications
              </span>
              <span className="nav-group-item">
                <span className="icon icon-signal"></span>
                AirDrop
              </span>
              <span className="nav-group-item">
                <span className="icon icon-monitor"></span>
                Desktop
              </span>
            </nav>
          </div>
		);
	}
}

export default Sidebar;
