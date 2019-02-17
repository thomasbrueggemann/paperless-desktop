import React, { useContext, useEffect, useState } from "react";
import spdf from "simple-react-pdf2";

import ToolbarContext from "../contexts/ToolbarContext";
import DocumentsContext from "../contexts/DocumentsContext";
import LoginContext from "../contexts/LoginContext";
import Axios from "axios";

String.prototype.truncate =
	String.prototype.truncate ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) : this;
	};

export default function Document() {
	// contexts
	const toolbarContext = useContext(ToolbarContext.Context);
	const documentsContext = useContext(DocumentsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	// local state
	const [doc, setDoc] = useState(null);
	const [data, setData] = useState(null);

	const { host, username, password } = loginContext.state;
	const id = 76;

	/**
	 * Fetch the base64 data URI of a resource
	 */
	async function fetchBase64(url) {
		const res = await Axios({
			method: "get",
			url: `${host}${url}`,
			auth: {
				username,
				password
			},
			responseType: "arraybuffer"
		});

		const imageData = new Buffer(res.data, "binary").toString("base64");
		const dataUri = `data:${res.headers["content-type"].toLowerCase()};base64,${imageData}`;

		return dataUri;
	}

	/**
	 * Fetch a single document from API and merge into current context
	 */
	async function fetchDocument() {
		// fetch tags from API
		const res = await Axios({
			method: "get",
			url: `${host}/api/documents/${id}`,
			auth: {
				username,
				password
			}
		});

		const doc = res.data;

		// set to local store
		documentsContext.dispatch({ type: "SET_DOCUMENT", documents: doc });

		// add a tab
		documentsContext.dispatch({
			type: "ADD_TAB",
			tab: { id, title: doc.title.truncate(15) + "...", type: doc.file_type }
		});

		setDoc(doc);

		// fetch
		setData(await fetchBase64(doc.download_url));
	}

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "ACTIVATE", active: "documents" });

		fetchDocument();
	}, []);

	if (!doc) return null;

	if (doc.file_type == "pdf") {
		return <iframe width="100%" height="100%" className="documentFileViewer" src={data} />;
	} else {
		return <img src={data} className="documentFileViewer" style={{ maxWidth: "100%" }} />;
	}
}
