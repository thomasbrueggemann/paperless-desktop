import React, { useContext, useEffect } from "react";
import Axios from "axios";

import DocumentsRow from "./DocumentsRow";
import DocumentCard from "./DocumentCard";

import ToolbarContext from "../contexts/ToolbarContext";
import DocumentsContext from "../contexts/DocumentsContext";
import LoginContext from "../contexts/LoginContext";

import "../styles/document.scss";

/**
 * Chunk an array [,,,,] into n-tuple arrays, e.g. [[,,],[,,]]
 * @param {Number} n Amount of chunks
 */
Array.prototype.chunk = function(n) {
	if (!this.length) {
		return [];
	}
	return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

const DOCUMENTS_PER_ROW = 4;

export default function Documents() {
	const toolbarContext = useContext(ToolbarContext.Context);
	const documentsContext = useContext(DocumentsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	async function fetchDocuments() {
		const { page, correspondent, tag } = documentsContext.state;
		const { host, username, password } = loginContext.state;

		// fetch tags from API
		const res = await Axios({
			method: "get",
			url: `${host}/api/documents`,
			auth: {
				username,
				password
			}
		});

		// set to local store
		documentsContext.dispatch({ type: "SET_DOCUMENTS", documents: res.data.results });
	}

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "ACTIVATE", active: "documents" });
		documentsContext.dispatch({ type: "SET_ACTIVE_TAB", activeTab: "documents" });

		fetchDocuments();
	}, []);

	return documentsContext.state.documents.chunk(DOCUMENTS_PER_ROW).map((docChunk, i) => {
		return (
			<DocumentsRow key={i}>
				{docChunk.map((doc, j) => {
					return <DocumentCard key={j} {...doc} />;
				})}
			</DocumentsRow>
		);
	});
}
