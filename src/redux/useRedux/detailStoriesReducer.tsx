import { IStoryDetails } from "../../interfaces/InterfacesMain";
import {
  DetailActionTypesStory,
  GET_DETAIL_FAILURE_STORY,
  GET_DETAIL_REQUEST_STORY,
  GET_DETAIL_SUCCESS_STORY,
} from "../ActionsMethods/storiesDetailType";

export interface IDetailsStateStory {
  loading: boolean;
  details: IStoryDetails[];
  error: Error | null;
}

const initialState: IDetailsStateStory = {
  loading: false,
  details: [],
  error: null,
};

export function detailStoryReducer(
  state = initialState,
  action: DetailActionTypesStory
) {
  switch (action.type) {
    case GET_DETAIL_REQUEST_STORY:
      return { ...state, loading: true };
    case GET_DETAIL_SUCCESS_STORY:
      return { ...state, loading: false, details: action.payload };
    case GET_DETAIL_FAILURE_STORY:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
