import { combineReducers } from "redux";
import { characterReducer } from "./characterReducer";
import { comicReducer } from "./comicReducer";
import { storiesReducer } from "./storiesReducer";

const Reducers = combineReducers({
  characters: characterReducer,
  comics: comicReducer,
  storys: storiesReducer,
});

export default Reducers;

export type State = ReturnType<typeof Reducers>;
