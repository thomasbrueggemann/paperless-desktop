import React from "react";
import Sidebar from "./Sidebar";

class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// RENDER
	render() {

		return (
			<div className="pane-group">
				<Sidebar />
				Hi
			</div>
		);
	}
}

export default Home;
