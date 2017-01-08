import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";

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

	// GET TAG COLOR
	getTagColor(idx) {
		var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928","#000000","#cccccc"];
		return colors[idx];
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

					return (
						<span className="nav-group-item" key={t.id}>
			                <span className="icon icon-record" style={{
								"color": this.getTagColor(t.colour)
							}}></span>
							{t.name}
						</span>
					);
				})}
			</nav>
		);
	}
}

export default SidebarTags;
