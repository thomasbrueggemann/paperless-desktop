import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";

class TagsInput extends React.Component {

	// CONSTRUCTOR
	constructor(props) {

		super(props);

		this.state = TagsStore.getState();
		this.state.selection = this.props.tags.map(t => {
			var s = t.replace(/\/$/, "").split("/");
			return parseInt(s[s.length - 1]);
		});

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

	// HANDLE DETAIL CHANGE
	handleDetailChange(e) {

		// retranslate the names into ids

		/*this.setState({
			"selection": e.target.value
		});*/
	}

	// RENDER
	render() {

		var value = "";

		console.log(this.state.tags);

		// prepare the selection tag ids
		if(this.state.tags && this.state.tags.count > 0) {

			// remap ids to names
			var names = this.state.selection.map(s => {

				// find the matching tag
				return this.state.tags.results.find(t => {
					return t.id === s;
				}).name;
			});

			value = names.join(",");
		}

		return (
			<input type="text" className="form-control" name="selection" placeholder="Tags" value={value} onChange={this.handleDetailChange.bind(this)} />
		);
	}
}

export default TagsInput;
