import axios from "axios";
import { JWTService } from "./jwt.service";

// * CREATE AXIOS INSTANCE
// * ---------------------

export const baseURL = import.meta.env.VITE_API_ENDPOINT;

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
    const jwt = new JWTService();
    const session = jwt.getSession();

    // ? DOES SESSION EXIST
    // ? ---------------------------------

    if (session === null) {
      jwt.clearSession();
      return req;
    }

    // ? DID REFRESH TOKEN EXPIRED
    // ? ------------------------

    if (jwt.isExpired(session.refreshToken)) {
      jwt.clearSession();
      return req;
    }

    // ? DID ACCESS TOKEN EXPIRED
    // ? ------------------------

    if (jwt.isExpired(session.accessToken)) {
      const { accessToken } = await jwt.refreshToken({
        refreshToken: session.refreshToken,
      });
      req.headers = {
        ...req.headers,
        authorization: `Bearer ${accessToken}`,
      };
      return req;
    }

    // * ADD ACCESSTOKEN & RETURN REQUEST
    // * -------------

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
    console.log(response.data);
    return response;
  },
  error => {
    console.log(error.response.data);
    return Promise.reject(error);
  }
);

export default httpService;
