import { Consultant } from "../../services/consultant/Consultant.model";
import { RequestError } from "../../app.types";

export const GET_CONSULTANT_PROFILE_ATTEMPT = "GET_CONSULTANT_PROFILE_ATTEMPT";
export const GET_CONSULTANT_PROFILE_SUCCESS = "GET_CONSULTANT_PROFILE_SUCCESS";
export const GET_CONSULTANT_PROFILE_ERROR = "GET_CONSULTANT_PROFILE_ERROR";
export const CLEAR_CONSULTANT_STATE = "CLEAR_CONSULTANT_STATE";

export const getConsultantProfileAttempt = () => ({
  type: GET_CONSULTANT_PROFILE_ATTEMPT,
});

export const getConsultantProfileSuccess = (payload: Consultant) => ({
  type: GET_CONSULTANT_PROFILE_SUCCESS,
  payload,
});

export const getConsultantProfileError = (error: RequestError) => ({
  type: GET_CONSULTANT_PROFILE_ERROR,
  error,
});

export const clearConsultantSate = () => ({
  type: CLEAR_CONSULTANT_STATE,
});
