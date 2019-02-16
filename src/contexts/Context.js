import React, { createContext, useReducer } from "react";

/**
 * Builds a new Context and Provider/Consumer structure based on a reducer hook and
 * the new Context API
 * @param {Object} initialState
 * @param {Function} reducer
 */
export function buildContext(initialState, reducer) {
	const Context = createContext();

	function ContextProvider(props) {
		// manage state my react reducer
		const [state, dispatch] = useReducer(reducer, initialState);

		// populate the provider with the current state and a dispatcher function
		return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
	}

	const ContextConsumer = Context.Consumer;

	return { Context, ContextProvider, ContextConsumer };
}
