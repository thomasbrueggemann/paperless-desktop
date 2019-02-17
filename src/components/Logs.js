import React, { useContext, useEffect } from "react";
import { Table, Container } from "bloomer";
import Axios from "axios";
import { DateTime } from "luxon";

import ToolbarContext from "../contexts/ToolbarContext";
import LoginContext from "../contexts/LoginContext";
import LogsContext from "../contexts/LogsContext";

export default function Logs() {
	const toolbarContext = useContext(ToolbarContext.Context);
	const logsContext = useContext(LogsContext.Context);
	const loginContext = useContext(LoginContext.Context);

	/**
	 * Fetch logs from API
	 */
	async function fetchLogs() {
		const { host, username, password } = loginContext.state;

		// fetch tags from API
		const res = await Axios({
			method: "get",
			url: `${host}/api/logs`,
			auth: {
				username,
				password
			}
		});

		// set to local store
		logsContext.dispatch({ type: "set", logs: res.data.results });
	}

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "activate", active: "logs" });

		fetchLogs();
	}, []);

	return (
		<Container isFluid>
			<Table isBordered isStriped>
				<thead>
					<tr>
						<th>Date</th>
						<th>Log</th>
					</tr>
				</thead>
				<tbody>
					{logsContext.state.logs.map((log, i) => {
						return (
							<tr key={i}>
								<td>
									{DateTime.fromISO(log.time).toLocaleString(
										DateTime.DATETIME_MED_WITH_SECONDS
									)}
								</td>
								<td>{log.messages}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
}
