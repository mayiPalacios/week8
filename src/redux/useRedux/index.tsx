import { combineReducers } from "redux";
import { characterReducer } from "./characterReducer";
import { comicReducer } from "./comicReducer";
import { storiesReducer } from "./storiesReducer";
import { bookmarkReducer } from "./bookMarkReducer";
import { hideReducer } from "./hideReducer";

const Reducers = combineReducers({
  characters: characterReducer,
  comics: comicReducer,
  storys: storiesReducer,
  bookmark: bookmarkReducer,
  hideCard: hideReducer,
});

export default Reducers;

export type State = ReturnType<typeof Reducers>;
