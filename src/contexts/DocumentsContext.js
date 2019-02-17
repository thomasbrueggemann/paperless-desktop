import { buildContext } from "./Context";

const initialState = {
	page: 0,
	correspondent: null,
	tag: null,
	documents: [],
	tabs: [],
	activeTab: "documents"
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type.toUpperCase()) {
		case "SET_PAGE":
			return { ...state, page: action.page };

		case "SET_DOCUMENTS":
			return { ...state, documents: action.documents };

		case "SET_DOCUMENT":
			// merge in the provided document and replace already existing document
			const filteredDocuments = state.documents.filter((doc) => {
				return doc.id !== action.documents.id;
			});

			filteredDocuments.push(action.documents);

			return {
				...state,
				documents: filteredDocuments
			};

		case "ADD_TAB":
			let tabs = state.tabs;

			// check if tab id already in tabs
			if (
				tabs.findIndex((t) => {
					return t.id === action.tab.id;
				}) < 0
			) {
				// add new tab
				tabs.push(action.tab);
			}

			// the currently added tab is automatically active
			return { ...state, tabs: tabs, activeTab: action.tab.id };

		case "SET_ACTIVE_TAB":
			// set the active tab to the id of the currently active one
			return { ...state, activeTab: action.activeTab };

		case "CLOSE_TAB":
			// filter all tabs that are not the closed one
			let newTabs = state.tabs.filter((t) => {
				return t.id !== action.id;
			});

			// set the active tab to the rightmost tab in the list
			return {
				...state,
				tabs: newTabs,
				activeTab: newTabs.length > 0 ? newTabs[newTabs.length - 1].id : "documents"
			};
	}
};

export default buildContext(initialState, reducer);
