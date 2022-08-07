import axios from "axios";
import store from "../../../../lib/store/store";
import { sliceStore } from "../slice";
import { initialState } from "../slice/initialState";
import { JWTService } from "./jwt.service";

// * CREATE AXIOS INSTANCE
// * ---------------------

export const baseURL = "http://localhost:3000";

const httpService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// * ADD INTERCEPTOR
// * ---------------

httpService.interceptors.request.use(
  async req => {
    const jwt = new JWTService();
    let session = jwt.getSession();

    // ! DOES SESSION EXIST IN LOCAL STORAGE
    // ! ---------------------------------
    
    if (session === null) {
      store.dispatch(sliceStore.actions.setCredentials(initialState));

      return req;
    }

    if (!jwt.isExpired(session.accessToken)) {
      req.headers = {
        ...req.headers,
        authorization: `Bearer ${session.accessToken}`,
      };
      return req;
    }
    if (jwt.isExpired(session.refreshToken)) {

      // ! DID REFRESH TOKEN EXPIRED
      // ! ------------------------

      store.dispatch(sliceStore.actions.setCredentials(initialState));
      return req;
    }

    // * REFRESH ACCESS TOKEN IF EXPIRED
    // * --------------------------------

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

    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

export default httpService;
