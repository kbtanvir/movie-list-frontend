import { AuthStore } from "../../data/dto/AuthStore";

export const reducers = {
  setCredentials: (
    state: AuthStore.State,
    {
      payload,
    }: {
      payload: Partial<AuthStore.State>;
    }
  ) => {
    return { ...state, ...payload };
  },
};
