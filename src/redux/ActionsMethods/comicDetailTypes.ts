import { IComicDetails } from "../../interfaces/InterfacesMain";
export const GET_DETAIL_REQUEST_COMIC = "GET_DETAIL_REQUEST_COMIC";
export const GET_DETAIL_SUCCESS_COMIC = "GET_DETAIL_SUCCESS_COMICS";
export const GET_DETAIL_FAILURE_COMIC = "GET_DETAIL_FAILURE_COMIC";

interface GetDetailsRequestAction {
  type: typeof GET_DETAIL_REQUEST_COMIC;
}

export interface GetDetailsSuccessAction {
  type: typeof GET_DETAIL_SUCCESS_COMIC;
  payload: IComicDetails;
}

interface GetDetailsFailureAction {
  type: typeof GET_DETAIL_FAILURE_COMIC;
  payload: Error;
}

export type DetailActionTypesComics =
  | GetDetailsRequestAction
  | GetDetailsSuccessAction
  | GetDetailsFailureAction;
