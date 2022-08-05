import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { reducer } from "./store.reducer";

const preloadedState = function () {
  try {
    const serialisedState = localStorage.getItem("state");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // preloadedState: preloadedState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

store.subscribe(() => {
  const state = store.getState();

  const persist = {
    session: state.auth.session,
  };

  // window.localStorage.setItem("state", JSON.stringify(persist));
});
