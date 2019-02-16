import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Columns, Column, Section } from "bloomer";

import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Documents from "./components/Documents";
import Logs from "./components/Logs";

import ToolbarContext from "./contexts/ToolbarContext";
import Login from "./components/Login";
import LoginContext from "./contexts/LoginContext";

const App = () => (
	<HashRouter>
		<LoginContext.ContextProvider>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route>
					<ToolbarContext.ContextProvider>
						<Toolbar />
						<Section id="content">
							<Switch>
								<Route path="/documents">
									<Columns isDesktop isGapless>
										<Column isSize="1/4" className="sidebar">
											<Sidebar />
										</Column>
										<Column>
											<Documents />
										</Column>
									</Columns>
								</Route>
								<Route path="/logs">
									<Logs />
								</Route>
							</Switch>
						</Section>
					</ToolbarContext.ContextProvider>
				</Route>
			</Switch>
		</LoginContext.ContextProvider>
	</HashRouter>
);

export default App;
