import React, { useContext, useEffect } from "react";

import ToolbarContext from "../contexts/ToolbarContext";
import DocumentsContext from "../contexts/DocumentsContext";
import LoginContext from "../contexts/LoginContext";

export default function Document() {
	const toolbarContext = useContext(ToolbarContext.Context);
	const documentsContext = useContext(DocumentsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "activate", active: "documents" });
	}, []);

	// find the current document within the documents state
	const doc = documentsContext.state.documents.find((doc) => {
		return doc.id === 76;
	});

	// construct a path to the file
	const path = host + doc.download_url;
	const { host } = loginContext.state;

	if (doc.file_type == "pdf") {
		return <spdf.SimplePDF file={path} />;
	} else {
		return <img src={path} style={{ maxWidth: "100%" }} />;
	}
}
