import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Columns, Column, Section } from "bloomer";

import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Documents from "./components/Documents";
import Logs from "./components/Logs";
import Document from "./components/Document";
import DocumentsTabs from "./components/DocumentsTabs";
import DocumentEditSidebar from "./components/DocumentEditSidebar";
import Login from "./components/Login";

import ToolbarContext from "./contexts/ToolbarContext";
import LoginContext from "./contexts/LoginContext";
import LogsContext from "./contexts/LogsContext";
import DocumentsContext from "./contexts/DocumentsContext";

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
								<Route path="/document*">
									<DocumentsContext.ContextProvider>
										<Columns isDesktop isGapless className="main-content">
											<Column isSize="1/4" className="sidebar">
												<Switch>
													<Route path="/documents">
														<Sidebar />
													</Route>

													<Route path="/document/:id">
														<DocumentEditSidebar />
													</Route>
												</Switch>
											</Column>
											<Column>
												<DocumentsTabs />
												<Switch>
													<Route path="/documents">
														<Documents />
													</Route>

													<Route path="/document/:id">
														<Document />
													</Route>
												</Switch>
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
