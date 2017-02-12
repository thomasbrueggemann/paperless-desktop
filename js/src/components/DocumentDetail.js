import React from "react";
import DocumentActions from "../actions/DocumentActions";
import DocumentStore from "../stores/DocumentStore";
import Sidebar from "./Sidebar";
import spdf from "simple-react-pdf";
import PaperlessComponent from "./PaperlessComponent";
import DocumentDetailForm from "./DocumentDetailForm";
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

	// COMPONENT WILL UPDATE
	componentWillUpdate(nextProps, nextState) {

		// something changed in the state id
		if(nextProps.params.id !== this.props.params.id) {

			this.setState({
				"doc": null
			});

			// fetch new document
			DocumentActions.getDocument(nextProps.params.id);
		}
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

	// RENDER
	render() {

		if(!this.state.doc) return null;

		return (
			<div className="pane-group">
				<div className="pane-two-third">
					<spdf.SimplePDF file={super.getHost() + this.state.doc.download_url.replace("\\", "")}/>
				</div>
				<div className="pane pane-one-third">
					<DocumentDetailForm doc={this.state.doc} />

					<button className="btn btn-default">
						<span className="icon icon-download"></span> Download
					</button>
				</div>
			</div>
		);
	}
}

export default DocumentDetail;
