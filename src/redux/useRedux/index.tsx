import { combineReducers } from "redux";
import { characterReducer } from "./characterReducer";
import { comicReducer } from "./comicReducer";
import { storiesReducer } from "./storiesReducer";
import { bookmarkReducer } from "./bookMarkReducer";
import { hideReducer } from "./hideReducer";
import { detailComicReducer } from "./detailComicReducer";
import { detailCharacterReducer } from "./detailCharacterReducer";

const Reducers = combineReducers({
  characters: characterReducer,
  comics: comicReducer,
  storys: storiesReducer,
  bookmark: bookmarkReducer,
  hideCard: hideReducer,
  characterDetails: detailCharacterReducer,
  comicDetails: detailComicReducer,
});

export default Reducers;

export type State = ReturnType<typeof Reducers>;
