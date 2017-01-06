import React from "react";
import Header from "./Header";

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// RENDER
	render() {

		return (
			<div className="window">
				<Header />
				<div className="window-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
