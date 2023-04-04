import { Reducer } from "redux";
import { State } from ".";
import {
  IMarvelCharacter,
  IMarvelComics,
} from "../../interfaces/InterfacesMain";
import { Ibookmark } from "../../interfaces/InterfacesMain";

interface BookmarkState {
  bookmarks: Ibookmark[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const ADD_BOOKMARK = "bookmark/addBookmark";
const REMOVE_BOOKMARK = "bookmark/removeBookmark";
const REMOVE_ALL_BOOKMARKS = "bookmark/removeAllBookmarks";

export const addBookmark = (bookmark: IMarvelCharacter | IMarvelComics) => {
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

export const removeAllBookmarks = () => {
  return {
    type: REMOVE_ALL_BOOKMARKS,
  };
};

export const bookmarkReducer: Reducer<BookmarkState> = (
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

    case REMOVE_ALL_BOOKMARKS:
      return initialState;

    default:
      return state;
  }
};

export const selectBookmarks = (state: State) => state.bookmark.bookmarks;
