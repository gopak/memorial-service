import { RootState } from "../reducers";
import { ConsultantState } from "../reducers/Consultant.reducer";

export const selectConsultantState = (state: RootState): ConsultantState =>
  state.consultant;
