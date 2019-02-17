import { buildContext } from "./Context";

const initialState = {
	logs: []
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		// set logs
		case "set":
			return { ...state, logs: action.logs };
	}
};

export default buildContext(initialState, reducer);
