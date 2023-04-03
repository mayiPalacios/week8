import { IMarvelComics } from "../../interfaces/InterfacesMain";
export const GET_COMICS_SUCCESS = "GET_COMICS_SUCCESS";
export const GET_COMICS_REQUEST = "GET_COMICS_REQUEST";
export const GET_COMICS_FAILURE = "GET_COMICS_FAILURE";

export interface GetComicsSuccessAction {
  type: typeof GET_COMICS_SUCCESS;
  payload: IMarvelComics[];
}

interface GetComicsRequestAction {
  type: typeof GET_COMICS_REQUEST;
}

interface GetComicsFailureAction {
  type: typeof GET_COMICS_FAILURE;
  payload: Error;
}

export type ComicActionTypes =
  | GetComicsRequestAction
  | GetComicsSuccessAction
  | GetComicsFailureAction;
