import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { moviesAPI } from "./../../features/movies/logic/slice/index";
import { reducer } from "./store.reducer";

const preloadedState = () => {
  try {
    const serialisedState = localStorage.getItem("state");

    if (serialisedState === null) return undefined;

    const auth = JSON.parse(serialisedState);

    return auth;
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
    }).concat(moviesAPI.middleware),
  preloadedState: preloadedState(),
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
    auth: state.auth,
  };

  window.localStorage.setItem("state", JSON.stringify(persist));
});

// setupListeners(store.dispatch);
