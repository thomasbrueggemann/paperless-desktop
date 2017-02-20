import React from "react";
import DocumentsActions from "../actions/DocumentsActions";
import DocumentsStore from "../stores/DocumentsStore";
import Sidebar from "./Sidebar";
import DocumentItem from "./DocumentItem";
import shouldPureComponentUpdate from "react-pure-render/function";
import $ from "jquery";
import ToolbarActions from "../actions/ToolbarActions";

class Documents extends React.Component {

	constructor(props) {
		super(props);
		this.state = DocumentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// SHOULD COMPONENT UPDATE
	shouldComponentUpdate = shouldPureComponentUpdate;

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).trigger("tabs.replace", {
			"idx": 0,
			"tab": {
				"title": "Documents",
				"route": "/documents"
			}
		});
		$(window).trigger("header.activeItem", {"item": "documents"});

		// load all documents event
		$(window).on("loadAllDocuments", function() {
			DocumentsActions.getDocuments();
		});

		// search documents
		$(window).on("searchDocuments", function(e, data) {
			DocumentsActions.searchDocuments(data.query);
		});

		DocumentsStore.listen(this.onChange);
		DocumentsActions.getDocuments();

		// clear toolbar to add new items
		ToolbarActions.clearItems();

		// toolbar: save button
		ToolbarActions.addItem("plus", "Add document", "primary", "right", () => {

			// add document
		});
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("loadAllDocuments");
		$(window).off("searchDocuments");
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

		if(!this.state.documents || !("results" in this.state.documents)) return null;

		return (
			<div className="pane-group">
				<Sidebar setTagFilter={this.setTagFilter.bind(this)} setCorrespondentFilter={this.setCorrespondentFilter.bind(this)} />
				<div className="pane">
					{this.state.documents.results.map(d => {
						return <DocumentItem document={d} key={d.id} />
					})}
				</div>
			</div>
		);
	}
}

export default Documents;
