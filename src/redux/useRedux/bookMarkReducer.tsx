import { AnyAction, Reducer } from "redux";
import { State } from ".";
import { IMarvelCharacter } from "../../interfaces/InterfacesMain";

interface BookmarkState {
  bookmarks: IMarvelCharacter[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const ADD_BOOKMARK = "bookmark/addBookmark";
const REMOVE_BOOKMARK = "bookmark/removeBookmark";

export const addBookmark = (bookmark: IMarvelCharacter) => {
  return {
    type: ADD_BOOKMARK,
    payload: bookmark,
  };
};

export const removeBookmark = (index: number) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: index,
  };
};

export const bookmarkReducer: Reducer<BookmarkState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
};

export const selectBookmarks = (state: State) => state.bookmark.bookmarks;
