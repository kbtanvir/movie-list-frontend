import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { authService } from "../../features/auth/logic/services/auth.service";
import { baseURL } from "../../features/auth/logic/services/axios.interceptor";
import { jwtService } from "../../features/auth/logic/services/jwt.service";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: async headers => {
    const session = authService.getSession();
    // ? DOES SESSION EXIST
    // ? ---------------------------------

    if (session === null) {
      authService.clearSession();
      return headers;
    }

    // ? DID REFRESH TOKEN EXPIRED
    // ? ------------------------

    if (jwtService.isExpired(session.refreshToken)) {
      authService.clearSession();
      return headers;
    }

    // ? DID ACCESS TOKEN EXPIRED
    // ? ------------------------

    if (jwtService.isExpired(session.accessToken)) {
      const { accessToken } = await authService.refreshToken({
        refreshToken: session.refreshToken,
      });
      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    }

    // * ADD ACCESSTOKEN & RETURN REQUEST
    // * --------------------------------

    headers.set("Authorization", `Bearer ${session.accessToken}`);
    
    return headers;
  },
});
