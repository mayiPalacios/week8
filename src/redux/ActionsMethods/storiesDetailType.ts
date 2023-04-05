import { IStoryDetails } from "../../interfaces/InterfacesMain";
export const GET_DETAIL_REQUEST_STORY = "GET_DETAIL_REQUEST_STORY";
export const GET_DETAIL_SUCCESS_STORY = "GET_DETAIL_SUCCESS_STORY";
export const GET_DETAIL_FAILURE_STORY = "GET_DETAIL_FAILURE_STORY";

interface GetDetailsRequestAction {
  type: typeof GET_DETAIL_REQUEST_STORY;
}

export interface GetDetailsSuccessAction {
  type: typeof GET_DETAIL_SUCCESS_STORY;
  payload: IStoryDetails;
}

interface GetDetailsFailureAction {
  type: typeof GET_DETAIL_FAILURE_STORY;
  payload: Error;
}

export type DetailActionTypesStory =
  | GetDetailsRequestAction
  | GetDetailsSuccessAction
  | GetDetailsFailureAction;
