import axios from "axios";
import { JWTService } from "./jwt.service";

export const baseURL = process.env.REACT_APP_API_URL;
const jwt = new JWTService();

// * CREATE AXIOS INSTANCE
// * ---------------------

let session = jwt.getSession();

const authAxios = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${session?.accessToken}` },
});

// * ADD INTERCEPTOR
// * ---------------

authAxios.interceptors.request.use(async req => {
  let session = jwt.getSession();

  // ! DID ACCESS TOKEN EXPIRED

  if (jwt.isTokenValid(session.accessToken)) return req;

  // * REFRESH ACCESS TOKEN
  // * ---------------------

  return await jwt.reqNewAccessToken(req);
});

export default authAxios;
