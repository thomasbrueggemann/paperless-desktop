import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";
import Select from "react-select";

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

	// ON CHANGE
	selectChanged(value) {
		this.props.onChange({
			target: {
				name: "correspondent",
				value: value.value
			}
		});
	}

	// RENDER
	render() {
		var options = this.state.correspondents.results.map((c) => {
			var value = localStorage.getItem("settings.host") + "/api/correspondents/" + c.id + "/";

			return {
				value: value,
				label: c.name
			};
		});

		return (
			<Select
				value={this.props.value}
				onChange={this.selectChanged.bind(this)}
				options={options}
			/>
		);
	}
}

export default CorrespondentSelect;
