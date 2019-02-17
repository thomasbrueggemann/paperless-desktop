import { buildContext } from "./Context";

const initialState = {
	page: 0,
	correspondent: null,
	tag: null,
	documents: [],
	tabs: []
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
				return doc.id !== action.document.id;
			});

			filteredDocuments.push(action.document);

			return {
				...state,
				documents: filteredDocuments
			};

		case "ADD_TAB":
			let tabs = state.tabs;
			tabs.push(action.tab);

			return { ...state, tabs: tabs };
	}
};

export default buildContext(initialState, reducer);
