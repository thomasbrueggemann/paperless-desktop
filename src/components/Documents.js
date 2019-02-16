import React, { useContext, useEffect } from "react";

import DocumentsTabs from "./DocumentsTabs";
import DocumentsRow from "./DocumentsRow";
import DocumentCard from "./DocumentCard";

import ToolbarContext from "../contexts/ToolbarContext";

export default function Documents() {
	const toolbarContext = useContext(ToolbarContext.Context);

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "activate", active: "documents" });
	}, []);

	return (
		<>
			<DocumentsTabs />
			<DocumentsRow>
				<DocumentCard />
				<DocumentCard />
				<DocumentCard />
			</DocumentsRow>
		</>
	);
}
