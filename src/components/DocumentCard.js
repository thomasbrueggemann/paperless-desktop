import React, { useContext, useEffect, useState } from "react";
import { Card, CardImage, CardContent, Content, Column } from "bloomer";
import Axios from "axios";
import { DateTime } from "luxon";

import LoginContext from "../contexts/LoginContext";

String.prototype.trunc =
	String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
	};

export default function DocumentCard(props) {
	const loginContext = useContext(LoginContext.Context);
	const [dataURI, setDataURI] = useState(
		"http://thecompletepackagellc.com/wp-content/uploads/2012/07/placeholder_21-470x352.jpg"
	);

	/**
	 * Fetch the base64 data URI for the thumbnail image
	 */
	async function fetchImageBase64() {
		const { host, username, password } = loginContext.state;
		const res = await Axios({
			method: "get",
			url: `${host}${props.thumbnail_url}`,
			auth: {
				username,
				password
			},
			responseType: "arraybuffer"
		});

		const imageData = new Buffer(res.data, "binary").toString("base64");
		const dataUri = `data:${res.headers["content-type"].toLowerCase()};base64,${imageData}`;

		setDataURI(dataUri);
	}

	useEffect(() => {
		fetchImageBase64();
	}, []);

	return (
		<Column>
			<Card className="document">
				<CardImage>
					<figure className="image is-4by3">
						<img src={dataURI} alt={props.title} width="200" />
					</figure>
				</CardImage>
				<CardContent>
					<Content>
						<b>{props.title.trunc(100)}</b>
						<small>
							{DateTime.fromISO(props.created).toLocaleString(
								DateTime.DATETIME_MED_WITH_SECONDS
							)}
						</small>
					</Content>
				</CardContent>
			</Card>
		</Column>
	);
}
