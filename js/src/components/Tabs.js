import React from "react";

class Tabs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"tabs": []
		}
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("tabs.push", this.pushTab.bind(this));
		$(window).on("tabs.replace", this.replaceTab.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("tabs.push");
		$(window).off("tabs.replace");
	}

	// PUSH TAB
	pushTab() {

	}

	// REPLACE TAB
	replaceTab() {

	}

	// RENDER
	render() {

		if(this.state.tabs.length <= 1) return null;

		return (
			<div className="tab-group">
				{this.state.tabs.map(t => {
					return (
						<div className="tab-item">
			  			    <span className="icon icon-cancel icon-close-tab"></span>
			  			    {t.title}
		  			  	</div>
					);
				})}
			</div>
		);
	}
}

export default Tabs;
