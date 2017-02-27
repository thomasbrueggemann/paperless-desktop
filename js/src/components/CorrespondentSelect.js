import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";

class CorrespondentSelect extends React.Component {

	// CONSTRUCTOR
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
		return (
			<select className="form-control">
				{this.state.correspondents.results.map(c => {
					if(this.props.value === c.id) {
						return (<option key={c.id} value={c.id} selected="selected">{c.name}</option>);
					}
					else {
						return (<option key={c.id} value={c.id}>{c.name}</option>);
					}
				})}
			</select>
		);
	}
}

export default CorrespondentSelect;
