import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Section } from "bloomer";

import DocumentsContext from "../contexts/DocumentsContext";

export default function DocumentsTabs() {
	const documentsContext = useContext(DocumentsContext.Context);

	return (
		<Section id="tabs">
			<div className="tabs is-boxed">
				<ul>
					<li className="is-active">
						<Link to="">
							<span className="icon is-small">
								<i className="fas fa-image" aria-hidden="true" />
							</span>
							<span>Documents</span>
						</Link>
					</li>
					<li>
						<a>
							<span className="icon is-small">
								<i className="fas fa-music" aria-hidden="true" />
							</span>
							<span>Document 123</span>
						</a>
					</li>
				</ul>
			</div>
		</Section>
	);
}
