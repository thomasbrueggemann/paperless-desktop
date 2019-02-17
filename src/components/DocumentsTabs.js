import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Section, Tabs, TabList, Tab, Delete } from "bloomer";

import DocumentsContext from "../contexts/DocumentsContext";
import DocumentsTabItem from "./DocumentsTabItem";

import "../styles/tabs.scss";

export default function DocumentsTabs() {
	const documentsContext = useContext(DocumentsContext.Context);

	return (
		<Section id="tabs">
			<Tabs isBoxed>
				<TabList>
					<Tab isActive={documentsContext.state.activeTab === "documents"}>
						<Link to="/documents">
							<span className="icon is-small">
								<i className="fas fa-folder-open" aria-hidden="true" />
							</span>
							<span>Documents</span>
						</Link>
					</Tab>
					{documentsContext.state.tabs.map((tab) => {
						return (
							<Tab isActive={documentsContext.state.activeTab === tab.id}>
								<DocumentsTabItem {...tab} />
							</Tab>
						);
					})}
				</TabList>
			</Tabs>
		</Section>
	);
}
