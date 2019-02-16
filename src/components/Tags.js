import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TagsContext from "../contexts/TagsContext";

function Tags() {
	const tagsContext = useContext(TagsContext.Context);

	// load tags
	useEffect(async () => {
		// fetch tags from API
		const res = await axios({
			method: "get",
			url: "http://localhost:1337/tags"
		});

		// set to local store
		tagsContext.dispatch({ type: "set", tags: res.data });
	}, []);

	return (
		<>
			<h1>Tags</h1>
			<Link to="/tags/add">Add tag</Link>
			<ul>
				{tagsContext.state.tags.map((tag) => {
					return <li key={tag._id}>{tag.title}</li>;
				})}
			</ul>
		</>
	);
}

export default Tags;
