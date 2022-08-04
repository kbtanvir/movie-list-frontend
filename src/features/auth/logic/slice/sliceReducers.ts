import { Auth } from "../../data/types/Auth";

export const reducers = {
  setCredential: (
    state: Auth.Selector,
    { ...actions }: { payload: Auth.Selector }
  ) => {
    state = { ...state, ...actions.payload };
  },
};
