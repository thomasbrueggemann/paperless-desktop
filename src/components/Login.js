import React, { useContext, useEffect } from "react";
import { Field, Control, Input, Box, Button, Columns, Column, Level, LevelItem } from "bloomer";

import LoginContext from "../contexts/LoginContext";
import { useRouter } from "../useRouter";

export default function Login() {
	const loginContext = useContext(LoginContext.Context);
	const routerContext = useRouter();

	function validateLoginAndNavigateToDocuments() {
		const { host, username, password } = loginContext.state;

		console.log(host, username, password);

		// input is correct, move on
		if (host.length > 0 && username.length > 0 && password.length > 0) {
			routerContext.history.push("/documents");
		}
	}

	return (
		<Columns>
			<Column isSize="1/3" isOffset="1/3">
				<Level>
					<LevelItem>
						<figure>
							<img
								src={require("../styles/logo.png")}
								width="240"
								style={{ marginTop: "50px" }}
							/>
						</figure>
					</LevelItem>
				</Level>
				<Box>
					<form>
						<Field>
							<Control>
								<Input
									type="text"
									placeholder="Paperless host, e.g. http://localhost:1234"
									autoFocus=""
									onChange={(event) => {
										loginContext.dispatch({
											type: "set_host",
											host: event.target.value
										});
									}}
								/>
							</Control>
						</Field>
						<Field>
							<Control>
								<Input
									type="text"
									placeholder="Username"
									autoFocus=""
									onChange={(event) => {
										loginContext.dispatch({
											type: "set_username",
											username: event.target.value
										});
									}}
								/>
							</Control>
						</Field>
						<Field>
							<Control>
								<Input
									type="password"
									placeholder="Password"
									onChange={(event) => {
										loginContext.dispatch({
											type: "set_password",
											password: event.target.value
										});
									}}
								/>
							</Control>
						</Field>
						<Button
							isFullWidth
							isColor="light"
							className="button is-block"
							onClick={() => {
								console.log("hi");
								validateLoginAndNavigateToDocuments();
							}}
						>
							Login
						</Button>
					</form>
				</Box>
				<Level>
					<LevelItem>
						<p className="has-text-grey">
							Requires{" "}
							<a
								target="_blank"
								href="https://github.com/the-paperless-project/paperless"
							>
								Paperless
							</a>{" "}
							of at least version 0.4.1
						</p>
					</LevelItem>
				</Level>
			</Column>
		</Columns>
	);
}
