import { AuthType } from "../../data/types/AuthType";

export const reducers = {
  setUser: (state: AuthType.Selector, { payload }: any) => {
    console.log(payload);
    state.user = payload;
  },
  setCredentials: (
    state: AuthType.Selector,
    {
      payload,
    }: {
      payload: Partial<AuthType.Selector>;
    }
  ) => {
    return { ...state, ...payload };
  },
};
