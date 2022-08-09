import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { baseURL } from "../../features/auth/logic/services/axios.interceptor";
import { RootState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.session?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
