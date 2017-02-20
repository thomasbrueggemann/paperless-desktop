import React from "react";
import $ from "jquery";
import PaperlessComponent from "./PaperlessComponent";

class SidebarTagItem extends PaperlessComponent {

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
