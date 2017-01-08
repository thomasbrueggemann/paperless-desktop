import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";

class SidebarCorrespondents extends React.Component {

	constructor(props) {
		super(props);
		this.state = CorrespondentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		CorrespondentsStore.listen(this.onChange);
		CorrespondentsActions.getTags();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		CorrespondentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(!this.state.correspondents || !("results" in this.state.correspondents)) return null;

		return (
			<nav className="nav-group">
				<h5 className="nav-group-title">Correspondents</h5>
				{this.state.correspondents.results.map(t => {

					return (
						<span className="nav-group-item">
			                <span className="icon icon-user"></span>
							{t.name}
						</span>
					);
				})}
			</nav>
		);
	}
}

export default SidebarCorrespondents;
