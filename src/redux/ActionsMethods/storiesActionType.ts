import { IMarvelStories } from "../../interfaces/InterfacesMain";
export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";
export const GET_STORIES_REQUEST = "GET_STORIES_REQUEST";
export const GET_STORIES_FAILURE = "GET_STORIES_FAILURE";

export interface GetStoriesSuccessAction {
  type: typeof GET_STORIES_SUCCESS;
  payload: IMarvelStories[];
}

interface GetStoriesRequestAction {
  type: typeof GET_STORIES_REQUEST;
}

interface GetStoriesFailureAction {
  type: typeof GET_STORIES_FAILURE;
  payload: Error;
}

export type StoryActionTypes =
  | GetStoriesSuccessAction
  | GetStoriesRequestAction
  | GetStoriesFailureAction;
