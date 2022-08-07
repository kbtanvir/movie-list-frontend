import { AuthStore } from "../../data/dto/AuthStore";

export const initialState: AuthStore.State = {

  user: null,
  isAuthenticated: false,
  session: null,
};
