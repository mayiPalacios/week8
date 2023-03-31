import { createStore, applyMiddleware } from "redux";
import Reducers from "../useRedux/index";
import thunk from "redux-thunk";

const store = createStore(Reducers, applyMiddleware(thunk));

export default store;
