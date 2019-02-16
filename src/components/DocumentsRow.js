import React, { useContext, useEffect } from "react";
import { Section, Columns } from "bloomer";

export default function DocumentsRow(props) {
	return (
		<Section>
			<Columns className="document-columns">{props.children}</Columns>
		</Section>
	);
}
