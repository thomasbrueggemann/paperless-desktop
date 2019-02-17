import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Columns, Column, Section } from "bloomer";

import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Documents from "./components/Documents";
import Logs from "./components/Logs";
import Document from "./components/Document";

import ToolbarContext from "./contexts/ToolbarContext";
import Login from "./components/Login";
import LoginContext from "./contexts/LoginContext";
import LogsContext from "./contexts/LogsContext";
import DocumentsContext from "./contexts/DocumentsContext";
import DocumentEditSidebar from "./components/DocumentEditSidebar";

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
											<DocumentsContext.ContextProvider>
												<Documents />
											</DocumentsContext.ContextProvider>
										</Column>
									</Columns>
								</Route>
								<Route path="/document/:id">
									<DocumentsContext.ContextProvider>
										<Columns isDesktop isGapless>
											<Column isSize="1/4" className="sidebar">
												<DocumentEditSidebar />
											</Column>
											<Column>
												<Document />
											</Column>
										</Columns>
									</DocumentsContext.ContextProvider>
								</Route>
								<Route path="/logs">
									<LogsContext.ContextProvider>
										<Logs />
									</LogsContext.ContextProvider>
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
