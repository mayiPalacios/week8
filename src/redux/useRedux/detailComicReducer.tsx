import { IComicDetails } from "../../interfaces/InterfacesMain";
import {
  DetailActionTypesComics,
  GET_DETAIL_FAILURE_COMIC,
  GET_DETAIL_REQUEST_COMIC,
  GET_DETAIL_SUCCESS_COMIC,
} from "../ActionsMethods/comicDetailTypes";

export interface IDetailsState {
  loading: boolean;
  details: IComicDetails[];
  error: Error | null;
}

const initialState: IDetailsState = {
  loading: false,
  details: [],
  error: null,
};

export function detailComicReducer(
  state = initialState,
  action: DetailActionTypesComics
) {
  switch (action.type) {
    case GET_DETAIL_REQUEST_COMIC:
      return { ...state, loading: true };
    case GET_DETAIL_SUCCESS_COMIC:
      return { ...state, loading: false, details: action.payload };
    case GET_DETAIL_FAILURE_COMIC:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
