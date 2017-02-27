import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";
import SidebarCorrespondentItem from "./SidebarCorrespondentItem";

class SidebarCorrespondents extends React.Component {

	constructor(props) {
		super(props);
		this.state = CorrespondentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		CorrespondentsStore.listen(this.onChange);
		CorrespondentsActions.getCorrespondents();
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
				{this.state.correspondents.results.map(c => {
					return <SidebarCorrespondentItem
						correspondent={c}
						key={c.id}
						setCorrespondentFilter={this.props.setCorrespondentFilter}
					/>;
				})}
			</nav>
		);
	}
}

export default SidebarCorrespondents;
