import React from "react";
import PaperlessComponent from "../components/PaperlessComponent";
import spdf from "simple-react-pdf2";

class DocumentRender extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			doc: this.props.doc
		};
	}

	// RENDER
	render() {
		this.path = super.getHost() + this.state.doc.download_url.replace("\\", "");
		if (this.state.doc.file_type == "pdf") {
			return <spdf.SimplePDF file={this.path} />;
		} else {
			return <img src={this.path} style={{ maxWidth: "100%" }} />;
		}
	}
}

export default DocumentRender;
