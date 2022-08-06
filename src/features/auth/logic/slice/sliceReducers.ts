import { AuthStore } from "../../data/dto/AuthStore";

export const reducers = {
  setUser: (state: AuthStore.State, { payload }: any) => {
    console.log(payload);
    state.user = payload;
  },
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
