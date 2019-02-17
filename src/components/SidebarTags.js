import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TagsContext from "../contexts/TagsContext";
import { MenuLink } from "bloomer";
import LoginContext from "../contexts/LoginContext";

export default function SidebarTags() {
	const tagsContext = useContext(TagsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	/**
	 * Fetch tags from API
	 */
	async function fetchTags() {
		const { host, username, password } = loginContext.state;

		// fetch tags from API
		const res = await Axios({
			method: "get",
			url: `${host}/api/tags/?ordering=name`,
			auth: {
				username,
				password
			}
		});

		// set to local store
		tagsContext.dispatch({ type: "set", tags: res.data.results });
	}

	/**
	 * Get a tag color by its index
	 * @param {number} idx
	 */
	function getTagColor(idx) {
		var colors = [
			"#a6cee3",
			"#1f78b4",
			"#b2df8a",
			"#33a02c",
			"#fb9a99",
			"#e31a1c",
			"#fdbf6f",
			"#ff7f00",
			"#cab2d6",
			"#6a3d9a",
			"#b15928",
			"#000000",
			"#cccccc"
		];
		return colors[idx - 1];
	}

	// load tags
	useEffect(() => {
		fetchTags();
	}, []);

	return tagsContext.state.tags.map((tag) => {
		return (
			<li key={tag.id}>
				<MenuLink>
					<span className="tag" style={{ backgroundColor: getTagColor(tag.colour) }}>
						{tag.name}
					</span>
				</MenuLink>
			</li>
		);
	});
}
