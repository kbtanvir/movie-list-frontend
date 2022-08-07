import axios from "axios";
import store from "../../../../lib/store/store";
import { AuthStore } from "../../data/dto/AuthStore";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import { sliceStore } from "../slice";
import { initialState } from "../slice/initialState";
import { APIEndpoints, AuthService } from "./auth.service";
import { baseURL } from "./axios.interceptor";

export class JWTService {
  public decodeToken(token: string): any {
    const actualToken = token.split(".")[1];

    if (!actualToken) return null;

    return JSON.parse(window.atob(actualToken));
  }

  public isExpired(token: string): boolean {
    const user: AuthStore.User = this.decodeToken(token);
    const now = new Date().getTime() / 1000;
    return user.exp < now;
  }

 





}
