import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducer } from "./root.reducer";

// sync state to local storage
// export function loadFromLocalStorage() {
//   try {
//     const serialisedState = localStorage.getItem("state");
//     if (serialisedState === null) return undefined;
//     return JSON.parse(serialisedState);
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// configure store
export const store: Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // preloadedState: loadFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();


export default store;

// subscribe store - save data in local storage

store.subscribe(() => {
  const state = store.getState();

  // const stateData = {
  //   auth: state.auth,
  // };
  // window.localStorage.setItem("state", JSON.stringify(stateData));

  window.localStorage.setItem("accessToken", state.auth.user?.accessToken);
  window.localStorage.setItem("refreshToken", state.auth.user?.refreshToken);
});

export const rootState = (state: RootState) => state;
