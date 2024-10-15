import * as types from "../actions/Consultant.action";
import { RequestError } from "../../app.types";
import { Consultant } from "../../services/consultant/Consultant.model";

export interface ConsultantState {
  profile: Consultant | null;
  profileLoading: boolean;
  error: RequestError | null;
}

const initialState: ConsultantState = {
  profile: null,
  profileLoading: false,
  error: null,
};

export const consultantReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONSULTANT_PROFILE_ATTEMPT:
      return {
        ...state,
        profileLoading: true,
      };
    case types.GET_CONSULTANT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false,
      };
    case types.GET_CONSULTANT_PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
        profileLoading: false,
      };
    case types.CLEAR_CONSULTANT_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
