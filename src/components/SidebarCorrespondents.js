import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MenuLink } from "bloomer";

import CorrespondentsContext from "../contexts/CorrespondentsContext";
import LoginContext from "../contexts/LoginContext";

export default function SidebarCorrespondents() {
	const correspondentsContext = useContext(CorrespondentsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	/**
	 * Fetch correspondents from API
	 */
	async function fetchCorrespondents() {
		const { host, username, password } = loginContext.state;

		// fetch tags from API
		const res = await axios({
			method: "get",
			url: `${host}/api/correspondents/?ordering=name`,
			auth: {
				username,
				password
			}
		});

		// set to local store
		correspondentsContext.dispatch({ type: "set", tags: res.data.results });
	}

	useEffect(() => {
		fetchCorrespondents();
	}, []);

	return correspondentsContext.state.correspondents.map((correspondent) => {
		return (
			<li key={correspondent.id}>
				<MenuLink>
					<i className="fas fa-user" /> {correspondent.name}
				</MenuLink>
			</li>
		);
	});
}
