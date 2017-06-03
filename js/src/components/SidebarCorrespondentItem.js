import React from "react";
import $ from "jquery";

class SidebarCorrespondentItem extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on(
			"changeExternCorrespendent",
			this.changeExternCorrespendent.bind(this)
		);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("changeExternCorrespendent");
	}

	// SET CORRESPONDENT FILTER
	setCorrespondentFilter() {
		$(window).trigger("changeExternCorrespendent", {
			correspondent: this.props.correspondent.slug
		});

		// set or unset the tag
		if (this.state.active === true) {
			this.props.setCorrespondentFilter(null);
		} else {
			this.props.setCorrespondentFilter(this.props.correspondent.slug);
		}

		// toggle active state
		this.setState({
			active: !this.state.active
		});
	}

	// CHANGE EXTERN CORRESPONDENT
	changeExternCorrespendent(e, data) {
		this.setState({
			active: this.props.correspondent.slug === data.correspondent
		});
	}

	// RENDER
	render() {
		var itemClass = "nav-group-item";
		if (this.state.active === true) {
			itemClass += " active";
		}

		return (
			<span
				className={itemClass}
				onClick={this.setCorrespondentFilter.bind(this)}
			>
				<span className="icon icon-user" />
				{this.props.correspondent.name}
			</span>
		);
	}
}

export default SidebarCorrespondentItem;
