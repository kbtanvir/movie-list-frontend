import authReducer from "../../features/auth/logic/slice/index";
import { moviesAPI } from "./../../features/movies/logic/slice/index";

export const reducer = {
  auth: authReducer,
  [moviesAPI.reducerPath]: moviesAPI.reducer,
};
