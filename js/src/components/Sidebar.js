import React from "react";
import SidebarTags from "./SidebarTags";
import PaperlessComponent from "./PaperlessComponent";
import SidebarCorrespondents from "./SidebarCorrespondents";
import Select from "react-select";

class Sidebar extends PaperlessComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: "-created"
		};
	}

	updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	}

	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		var options = [
			{ value: "-created", label: "Document Date" },
			{ value: "name", label: "Alphabetical" }
		];
		var clearable = false;
		return (
			<div className="pane pane-sm sidebar">
				<Select
					id="order-select"
					ref={(ref) => {
						this.select = ref;
					}}
					options={options}
					clearable={clearable}
					simpleValue
					name="selected-order"
					value={this.props.ordering}
					onChange={this.props.setOrdering}
				/>
				<SidebarCorrespondents setCorrespondentFilter={this.props.setCorrespondentFilter} />
				<SidebarTags setTagFilter={this.props.setTagFilter} />
			</div>
		);
	}
}

export default Sidebar;
