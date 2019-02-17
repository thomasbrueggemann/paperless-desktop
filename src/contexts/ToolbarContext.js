import { buildContext } from "./Context";

const initialState = {
	active: "documents"
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		// set the active item
		case "ACTIVATE":
			return { ...state, active: action.active };
	}
};

export default buildContext(initialState, reducer);
