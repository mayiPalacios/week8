import { CharacterActionTypes } from "../ActionsMethods/characterActionTypes";
import {
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_FAILURE,
  GET_CHARACTERS_SUCCESS,
} from "../ActionsMethods/characterActionTypes";
import { IMarvelCharacter } from "../../interfaces/InterfacesMain";

export interface IcharactersState {
  loading: boolean;
  characters: IMarvelCharacter[] | null;
  error: Error | null;
}

const initialState: IcharactersState = {
  loading: false,
  characters: null,
  error: null,
};

export function characterReducer(
  state = initialState,
  action: CharacterActionTypes
) {
  switch (action.type) {
    case GET_CHARACTERS_REQUEST:
      return { ...state, loading: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, loading: false, characters: action.payload };
    case GET_CHARACTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
