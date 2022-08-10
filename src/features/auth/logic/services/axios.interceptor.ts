import axios from "axios";
import { notify } from "../../../../lib/utils/helper";
import { authService } from "./auth.service";
import { jwtService } from "./jwt.service";

// * CREATE AXIOS INSTANCE
// * ---------------------

// export const baseURL = import.meta.env.VITE_API_ENDPOINT;
export const baseURL = "http://localhost:3000";

axios.defaults.baseURL = baseURL;

const httpService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// * REQUEST INTERCEPTOR
// * ---------------

httpService.interceptors.request.use(
  async req => {
    const session = authService.getSession();

    // ? DOES SESSION EXIST
    // ? ---------------------------------

    if (session === null) {
      authService.clearSession();
      return req;
    }

    // ? DID REFRESH TOKEN EXPIRED
    // ? ------------------------

    if (jwtService.isExpired(session.refreshToken)) {
      authService.clearSession();
      return req;
    }

    // ? DID ACCESS TOKEN EXPIRED
    // ? ------------------------

    if (jwtService.isExpired(session.accessToken)) {
      const { accessToken } = await authService.refreshToken({
        refreshToken: session.refreshToken,
      });
      req.headers = {
        ...req.headers,
        authorization: `Bearer ${accessToken}`,
      };
      return req;
    }

    // * ADD ACCESSTOKEN & RETURN REQUEST
    // * --------------------------------

    req.headers = {
      ...req.headers,
      authorization: `Bearer ${session.accessToken}`,
    };
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

// * RESPONSE INTERCEPTOR
// * --------------------

httpService.interceptors.response.use(
  response => {
    notify({
      message: response.data.message || "Sucess",
      type: "success",
    });
    // console.log(response.data);
    return response;
  },
  error => {
    // console.log(error.response.data);
    notify({
      message: error.response.data.message,
      type: "error",
    });

    return Promise.reject(error);
  }
);

export default httpService;
