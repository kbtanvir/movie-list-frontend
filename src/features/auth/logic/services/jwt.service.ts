import axios from "axios";
import store, { RootState } from "../../../../lib/store/store";
import { AuthStore } from "../../data/dto/AuthStore";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import { sliceStore } from "../slice";
import { initialState } from "../slice/initialState";
import { APIEndpoints } from "./auth.service";
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

  public getSession(): AuthStore.session {
    const state: RootState = JSON.parse(
      localStorage.getItem("state") as string
    );
    if (state === null) {
      store.dispatch(sliceStore.actions.setCredentials(initialState));
      return state;
    }

    return state.auth.session as AuthStore.session;
  }

  public setSession(session: AuthStore.State[AuthStore.Enum.session]): void {
    localStorage.setItem("state", JSON.stringify(store.getState()));

    store.dispatch(
      sliceStore.actions.setCredentials({ session, isAuthenticated: true })
    );
  }

  public async refreshToken(dto: RefreshTokenDto): Promise<AuthStore.session> {
    try {
      const response = await axios.post(
        baseURL + APIEndpoints.refreshToken,
        dto
      );
      // * UPDATE SESSION
      // * --------------

      const session: AuthStore.session = response.data;
      store.dispatch(sliceStore.actions.setCredentials({ session }));

      return response.data;
    } catch (error) {
      store.dispatch(sliceStore.actions.setCredentials(initialState));
      throw error;
    }
  }
}
