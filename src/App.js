import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Columns, Column } from "bloomer";

import Tags from "./components/Tags";
import Toolbar from "./components/Toolbar";

const App = () => (
	<HashRouter>
		<>
			<Toolbar />

			<section id="content">
				<Columns isDesktop isGapless>
					<Column isSize="1/4" className="sidebar">
						<Sidebar />
					</Column>
					<div className="column">
						<section id="tabs">
							<div className="tabs is-boxed">
								<ul>
									<li className="is-active">
										<a>
											<span className="icon is-small">
												<i className="fas fa-image" aria-hidden="true" />
											</span>
											<span>Documents</span>
										</a>
									</li>
									<li>
										<a>
											<span className="icon is-small">
												<i className="fas fa-music" aria-hidden="true" />
											</span>
											<span>Document 123</span>
										</a>
									</li>
								</ul>
							</div>
						</section>
						<section>
							<Switch>
								<Route exact path="/">
									<Tags />
								</Route>
							</Switch>
						</section>
					</div>
				</Columns>
			</section>
		</>
	</HashRouter>
);

export default App;
