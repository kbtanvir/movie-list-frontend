import { AuthType } from "../../data/types/AuthType";

export const initialState: AuthType.Selector = {
  user: null,
  isAuthenticated: false,
  session: null,
};
