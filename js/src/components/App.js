import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Tabs from "./Tabs";
import RemindersNotification from "./RemindersNotification";

class App extends React.Component {
	// RENDER
	render() {
		return (
			<div className="window">
				<RemindersNotification />
				<Header history={this.props.history} />
				<Tabs history={this.props.history} />
				<div className="window-content">{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

export default App;
