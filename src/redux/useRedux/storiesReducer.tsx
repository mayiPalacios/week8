import { IMarvelStories } from "../../interfaces/InterfacesMain";
import {
  GET_STORIES_FAILURE,
  GET_STORIES_REQUEST,
  GET_STORIES_SUCCESS,
  StoryActionTypes,
} from "../ActionsMethods/storiesActionType";

export interface IstoriesState {
  loading: boolean;
  story: IMarvelStories[] | null;
  error: Error | null;
}

const initialState: IstoriesState = {
  loading: false,
  story: null,
  error: null,
};

export function storiesReducer(state = initialState, action: StoryActionTypes) {
  switch (action.type) {
    case GET_STORIES_REQUEST:
      return { ...state, loading: true };
    case GET_STORIES_SUCCESS:
      return { ...state, loading: false, story: action.payload };
    case GET_STORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
