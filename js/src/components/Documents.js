import React from "react";
import DocumentsActions from "../actions/DocumentsActions";
import DocumentsStore from "../stores/DocumentsStore";
import Sidebar from "./Sidebar";
import DocumentItem from "./DocumentItem";

class Documents extends React.Component {

	constructor(props) {
		super(props);
		this.state = DocumentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		DocumentsStore.listen(this.onChange);
		DocumentsActions.getDocuments();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		DocumentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {

		if(!this.state.documents || !("results" in this.state.documents)) return null;

		return (
			<div className="pane-group">
				<Sidebar />
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
