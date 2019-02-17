import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DocumentsContext from "../contexts/DocumentsContext";
import { Delete } from "bloomer";

export default function DocumentsTabItem(props) {
	const documentsContext = useContext(DocumentsContext.Context);

	return (
		<Link to={`/document/${props.id}`}>
			<span className="icon is-small">
				{props.type.indexOf("pdf") >= 0 ? (
					<i className="fas fa-file-pdf" />
				) : (
					<i className="fas fa-file-image" />
				)}
			</span>
			<span>
				{props.title}{" "}
				<Delete
					isSize="small"
					onClick={() => {
						// close the tab
						documentsContext.dispatch({
							type: "CLOSE_TAB",
							id: props.id
						});

						// navigate to new active tab
						const activeTab = documentsContext.state.activeTab;
						let routeToHash = "/documents";

						if (activeTab !== "documents") {
							routeToHash = "/document/" + activeTab;
						}

						window.location.href = `/#/${routeToHash}`;
					}}
				/>
			</span>
		</Link>
	);
}
