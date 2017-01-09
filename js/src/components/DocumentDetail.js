import React from "react";
import DocumentsActions from "../actions/DocumentsActions";
import DocumentsStore from "../stores/DocumentsStore";
import Sidebar from "./Sidebar";
import spdf from "simple-react-pdf";
import PaperlessComponent from "./PaperlessComponent";

class DocumentDetail extends PaperlessComponent {

	constructor(props) {
		super(props);
		this.state = DocumentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		DocumentsStore.listen(this.onChange);
		DocumentsActions.getDocument(this.props.params.id);
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		DocumentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// SET TAG FILTER
	setTagFilter(tag) {
		this.setState({
			"tag": tag
		});

		DocumentsActions.getDocuments(this.state.correspondent, tag);
	}

	// SET CORRESPONDENT FILTER
	setCorrespondentFilter(correspondent) {
		this.setState({
			"correspondent": correspondent
		});

		DocumentsActions.getDocuments(correspondent, this.state.tag);
	}

	// RENDER
	render() {

		if(!this.state.documents || this.state.documents.results.length === 0) return null;

		var doc = this.state.documents.results[0];

		return (
			<div className="pane-group">
				<div className="pane-two-third">
					<spdf.SimplePDF file={super.getHost() + doc.download_url.replace("\\", "")}/>
				</div>
				<div className="pane pane-one-third">
					<form>
						<div class="form-group">
							<label>Title</label>
							<input type="text" class="form-control" placeholder="Title" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default DocumentDetail;
