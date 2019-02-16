import React, { useContext, useEffect } from "react";
import ToolbarContext from "../contexts/ToolbarContext";

export default function Logs() {
	const toolbarContext = useContext(ToolbarContext.Context);

	useEffect(() => {
		// set active toolbar item
		toolbarContext.dispatch({ type: "activate", active: "logs" });
	}, []);

	return "Logs";
}
