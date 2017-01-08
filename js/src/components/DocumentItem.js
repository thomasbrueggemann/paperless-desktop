import React from "react";
import {Link} from "react-router";

class DocumentItem extends React.Component {

	constructor(props) {
		super(props);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
	}

	// RENDER
	render() {

		var divStyle = {
            backgroundImage: 'url(' + localStorage.getItem("settings.host") + this.props.document.thumbnail_url.replace("\\", "") + ')'
        }

		return (
			<Link className="document-item" to={"/document/" + this.props.document.id}>
				<div className="document-item-thumbnail" style={divStyle}></div>
				<div className="document-item-title">{this.props.document.title}</div>
			</Link>
		);
	}
}

export default DocumentItem;
