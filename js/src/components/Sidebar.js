import React from "react";
import SidebarTags from "./SidebarTags";
import SidebarCorrespondents from "./SidebarCorrespondents";

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
	            <SidebarCorrespondents />
				<SidebarTags />
			</div>
		);
	}
}

export default Sidebar;
