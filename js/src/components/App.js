import React from "react";
import Header from "./Header";
import Tabs from "./Tabs";

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
				<Header history={this.props.history} />
				<Tabs />
				<div className="window-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
