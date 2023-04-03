import { IMarvelCharacter } from "../../interfaces/InterfacesMain";
export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_FAILURE = "GET_CHARACTERS_FAILURE";

interface GetCharactersRequestAction {
  type: typeof GET_CHARACTERS_REQUEST;
}

export interface GetCharactersSuccessAction {
  type: typeof GET_CHARACTERS_SUCCESS;
  payload: IMarvelCharacter[];
}

interface GetCharactersFailureAction {
  type: typeof GET_CHARACTERS_FAILURE;
  payload: Error;
}

export type CharacterActionTypes =
  | GetCharactersRequestAction
  | GetCharactersSuccessAction
  | GetCharactersFailureAction;
