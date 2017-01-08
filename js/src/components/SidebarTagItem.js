import React from "react";
import $ from "jquery";

class SidebarTagItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"active": false
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("changeExternTag", this.changeExternTag.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("changeExternTag");
	}

	// GET TAG COLOR
	getTagColor(idx) {
		var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#b15928","#000000","#cccccc"];
		return colors[idx - 1];
	}

	// SET TAG FILTER
	setTagFilter() {

		$(window).trigger("changeExternTag", {"tag": this.props.tag.slug});

		// set or unset the tag
		if(this.state.active === true) {
			this.props.setTagFilter(null);
		}
		else {
			this.props.setTagFilter(this.props.tag.slug);
		}

		// toggle active state
		this.setState({
			"active": !this.state.active
		});
	}

	// CHANGE EXTERN TAG
	changeExternTag(e, data) {

		if(this.props.tag.slug !== data.tag) {
			this.setState({
				"active": false
			});
		}
	}

	// RENDER
	render() {

		var itemClass = "nav-group-item";
		if(this.state.active === true) {
			itemClass += " active";
		}

		return (
			<span className={itemClass} key={this.props.tag.id} onClick={this.setTagFilter.bind(this)}>
                <span className="icon icon-record" style={{
					color: this.getTagColor(this.props.tag.colour)
				}}></span>
				{this.props.tag.name}
			</span>
		);
	}
}

export default SidebarTagItem;
