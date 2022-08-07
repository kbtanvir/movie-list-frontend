import axios from "axios";
import store from "../../../../lib/store/store";
import { AuthStore } from "../../data/dto/AuthStore";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import { sliceStore } from "../slice";
import { initialState } from "../slice/initialState";
import { APIEndpoints } from "./auth.service";
import { baseURL } from "./axios.interceptor";

export class JWTService {
  private decodeToken(token: string): any {
    const actualToken = token.split(".")[1];

    if (!actualToken) return null;

    return JSON.parse(window.atob(actualToken));
  }

  public isExpired(token: string): boolean {
    const user: AuthStore.User = this.decodeToken(token);
    const now = new Date().getTime() / 1000;
    return user.exp < now;
  }

  public getSession(): AuthStore.session | null {
    return store.getState().auth.session;
  }
  public clearSession(): void {
    store.dispatch(sliceStore.actions.setCredentials(initialState));
  }

  public updateSession(session: AuthStore.State[AuthStore.Enum.session]): void {
    const user: AuthStore.User = this.decodeToken(session!.accessToken);
    store.dispatch(
      sliceStore.actions.setCredentials({
        user,
        session,
        isAuthenticated: true,
      })
    );
  }

  public async refreshToken(dto: RefreshTokenDto): Promise<AuthStore.session> {
    try {
      const response = await axios.post(
        baseURL + APIEndpoints.refreshToken,
        dto
      );

      const session: AuthStore.session = response.data;
      this.updateSession(session);

      return response.data;
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }
}
