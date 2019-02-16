import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import Tags from "./components/Tags";

const App = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/">
				<Tags />
			</Route>
		</Switch>
	</HashRouter>
);

export default App;
