import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../../data/types/Auth";
import { baseURL } from "./axios.interceptor.v2";

export class JWTService {
  public decodeToken(token: string): any {
    const actualToken = token.split(".")[1];

    if (!actualToken) return null;

    return JSON.parse(window.atob(actualToken));
  }

  public isExpired(exp: number): boolean {
    const now = new Date().getTime() / 1000;
    return exp > now;
  }

  public isTokenValid(token: string): boolean {
    const user: Auth.User = this.decodeToken(token);
    return this.isExpired(user.exp);
  }

  public getSession(): Auth.session {
    let session = JSON.parse(
      localStorage.getItem(Auth.AuthEnum.session) as string
    );
    if (!session) {
      session = JSON.parse(
        localStorage.getItem(Auth.AuthEnum.session) as string
      );
    }
    return session;
  }

  public setSession(session: Auth.Selector[Auth.AuthEnum.session]): void {
    localStorage.setItem(Auth.AuthEnum.session, JSON.stringify(session));
  }

  public async reqNewAccessToken(req: AxiosRequestConfig<any>) {
    let session = this.getSession();

    // ! IF REFRESH VALID

    if (!this.isTokenValid(session.refreshToken)) {
      this.setSession(null);
      return req;
    }

    const response = await axios.post(`${baseURL}/api/refresh-token`, {
      refreshToken: session.refreshToken,
    });

    const { refreshToken } = response.data;

    session = { ...session, refreshToken };

    this.setSession(session);

    req.headers!.Authorization = `Bearer ${response.data.access}`;

    return req;
  }
}
