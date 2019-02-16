import { buildContext } from "./Context";

const initialState = {
	correspondents: []
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		// set the initial tags
		case "set":
			return { ...state, correspondents: action.tags };

		// add a single tag to the list
		case "add":
			let correspondents = state.correspondents;
			correspondents.push(action.correspondent);

			return { ...state, correspondents: correspondents };
	}
};

export default buildContext(initialState, reducer);
