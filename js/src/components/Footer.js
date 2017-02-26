import React from "react";
import ToolbarStore from "../stores/ToolbarStore";

class Footer extends React.Component {

	constructor(props) {
		super(props);
		this.state = ToolbarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		ToolbarStore.listen(this.onChange);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ToolbarStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(this.state.items.length === 0) return null;

		return (
			<footer className="toolbar toolbar-footer">
  				<div className="toolbar-actions">
					{this.state.items.map(i => {
						return (
							<button
								key={i.id}
								className={"btn btn-" + i.flavor + " pull-" + i.position}
								onClick={i.click}>
								{(i.icon) ? <span className={"icon icon-" + i.icon}></span> : null} {i.text}
							</button>
						);
					})}
				</div>
			</footer>
		);
	}
}

export default Footer;
