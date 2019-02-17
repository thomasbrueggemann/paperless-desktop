import { buildContext } from "./Context";

const initialState = {
	page: 0,
	correspondent: null,
	tag: null,
	documents: []
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		case "set_page":
			return { ...state, page: action.page };

		case "set_documents":
			return { ...state, documents: action.documents };
	}
};

export default buildContext(initialState, reducer);
