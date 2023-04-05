import {
  GET_DETAIL_FAILURE,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_REQUEST,
  DetailActionTypes,
} from "../ActionsMethods/characterDetailTypes";
import { ICharacterDetails } from "../../interfaces/InterfacesMain";

export interface IDetailsState {
  loading: boolean;
  details: ICharacterDetails[];
  error: Error | null;
}

const initialState: IDetailsState = {
  loading: false,
  details: [],
  error: null,
};

export function detailCharacterReducer(
  state = initialState,
  action: DetailActionTypes
) {
  switch (action.type) {
    case GET_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_DETAIL_SUCCESS:
      return { ...state, loading: false, details: action.payload };
    case GET_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
