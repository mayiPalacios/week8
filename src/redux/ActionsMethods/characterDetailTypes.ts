import { ICharacterDetails } from "../../interfaces/InterfacesMain";
export const GET_DETAIL_REQUEST = "GET_DETAIL_REQUEST";
export const GET_DETAIL_SUCCESS = "GET_DETAIL_SUCCESS";
export const GET_DETAIL_FAILURE = "GET_DETAIL_FAILURE";

interface GetDetailsRequestAction {
  type: typeof GET_DETAIL_REQUEST;
}

export interface GetDetailsSuccessAction {
  type: typeof GET_DETAIL_SUCCESS;
  payload: ICharacterDetails;
}

interface GetDetailsFailureAction {
  type: typeof GET_DETAIL_FAILURE;
  payload: Error;
}

export type DetailActionTypes =
  | GetDetailsRequestAction
  | GetDetailsSuccessAction
  | GetDetailsFailureAction;
