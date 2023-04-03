import {
  ComicActionTypes,
  GET_COMICS_FAILURE,
  GET_COMICS_REQUEST,
  GET_COMICS_SUCCESS,
} from "../ActionsMethods/comicActionType";
import { IMarvelComics } from "../../interfaces/InterfacesMain";

export interface IcomicsState {
  loading: boolean;
  comics: IMarvelComics[] | null;
  error: Error | null;
}

const initialState: IcomicsState = {
  loading: false,
  comics: null,
  error: null,
};

export function comicReducer(state = initialState, action: ComicActionTypes) {
  switch (action.type) {
    case GET_COMICS_REQUEST:
      return { ...state, loading: true };
    case GET_COMICS_SUCCESS:
      return { ...state, loading: false, comics: action.payload };
    case GET_COMICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
