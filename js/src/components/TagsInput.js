import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import Select2 from "react-select2-wrapper";

class TagsInput extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);

		this.state = TagsStore.getState();

		if(this.props.tags) {

			// extract the tags selection
			this.state.selection = this.props.tags.map(t => {
				var s = t.replace(/\/$/, "").split("/");
				return parseInt(s[s.length - 1]);
			});
		}

		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		TagsStore.listen(this.onChange);
		TagsActions.getTags();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		TagsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// Add SELECTION
	addSelection(e) {
		var id = parseInt(e.target.value);
		var selection = this.state.selection;

		if(selection.indexOf(id) === -1) {
			selection.push(id);

			console.log(selection);
			this.setState({
				"selection": selection
			});
		}
	}

	// REMOVE SELECTION
	removeSelection(e) {
		var id = parseInt(e.target.value);

		var selection = this.state.selection;
		this.setState({
			"selection": selection.splice(selection.indexOf(id), 1)
		});
	}

	// RENDER
	render() {

		var possibles = [];

		// prepare the selection tag ids
		if(this.state.tags && this.state.tags.count > 0) {

			// possible tags
			possibles = this.state.tags.results.map(t => {
				return {
					"text": t.name,
					"id": t.id
				}
			});
		}

		return (
			<Select2
				multiple
				data={possibles}
				onSelect={this.addSelection.bind(this)}
				onUnselect={this.removeSelection.bind(this)}
				defaultValue={this.state.selection}
				options={{
				  placeholder: "Tags",
				}}
			/>
		);
	}
}

export default TagsInput;
