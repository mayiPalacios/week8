import { Reducer } from "redux";
import { State } from ".";

const HIDE_CARD = "HIDE_CARD";
const SHOW_CARD = "SHOW_CARD";

interface Ihide {
  id: number[];
}

const initialState: Ihide = {
  id: [],
};

export const hideCard = (index: number) => {
  return {
    type: HIDE_CARD,
    payload: index,
  };
};

export const showAllHideCards = () => {
  return {
    type: SHOW_CARD,
  };
};

export const hideReducer: Reducer<Ihide> = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_CARD:
      return {
        ...state,
        id: [...state.id, action.payload],
      };

    case SHOW_CARD:
      return initialState;

    default:
      return state;
  }
};

export const selectHideCards = (state: State) => state.hideCard.id;
