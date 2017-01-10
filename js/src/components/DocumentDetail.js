import React from "react";
import DocumentActions from "../actions/DocumentActions";
import DocumentStore from "../stores/DocumentStore";
import Sidebar from "./Sidebar";
import spdf from "simple-react-pdf";
import PaperlessComponent from "./PaperlessComponent";
import $ from "jquery";

class DocumentDetail extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = DocumentStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {

		DocumentStore.listen(this.onChange);
		DocumentActions.getDocument(this.props.params.id);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		DocumentStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {

		// add new tab
		$(window).trigger("tabs.push", {
			"title": state.doc.title,
			"route": "/document/" + this.props.params.id
		});

		this.setState(state);
	}

	// SET TAG FILTER
	setTagFilter(tag) {
		this.setState({
			"tag": tag
		});

		//DocumentsActions.getDocuments(this.state.correspondent, tag);
	}

	// SET CORRESPONDENT FILTER
	setCorrespondentFilter(correspondent) {
		this.setState({
			"correspondent": correspondent
		});

		//DocumentsActions.getDocuments(correspondent, this.state.tag);
	}

	// RENDER
	render() {

		if(!this.state.doc) return null;

		return (
			<div className="pane-group">
				<div className="pane-two-third">
					<spdf.SimplePDF file={super.getHost() + this.state.doc.download_url.replace("\\", "")}/>
				</div>
				<div className="pane pane-one-third">
					<form className="form-detail-info">
						<div className="form-group">
							<label>Title</label>
							<input type="text" className="form-control" placeholder="Title" defaultValue={this.state.doc.title} />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default DocumentDetail;
