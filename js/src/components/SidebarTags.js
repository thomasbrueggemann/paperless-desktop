import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import SidebarTagItem from "./SidebarTagItem";

class SidebarTags extends React.Component {

	constructor(props) {
		super(props);
		this.state = TagsStore.getState();
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

	// RENDER
	render() {

		if(!this.state.tags || !("results" in this.state.tags)) return null;

		return (
			<nav className="nav-group">
				<h5 className="nav-group-title">Tags</h5>
				{this.state.tags.results.map(t => {
					return <SidebarTagItem tag={t} key={t.id} setTagFilter={this.props.setTagFilter} />;
				})}
			</nav>
		);
	}
}

export default SidebarTags;
