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
	}

	// RENDER
	render() {

		if(this.state.tabs.length === 0) return null;

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
