import { useContext } from "react";
import * as ReactRouter from "react-router";

const RouterContext = ReactRouter.__RouterContext;

// FIXME:  use official API when https://github.com/ReactTraining/react-router/pull/6453 merged

export function useRouter() {
	return useContext(RouterContext);
}
