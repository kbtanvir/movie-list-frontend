import axios from "axios";
import store from "../../../../lib/store/store";
import { AuthStore } from "../../data/dto/AuthStore";
import {
  ChangePasswordDto,
  ReqChangePasswordDTO,
} from "../../data/dto/change-password.dto";
import { LoginDto } from "../../data/dto/login.dto";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import { sliceStore } from "../slice";
import { initialState } from "../slice/initialState";
import httpService from "./axios.interceptor";
import { jwtService } from "./jwt.service";

export enum APIEndpoints {
  login = "/auth/login",
  register = "/auth/register",
  refreshToken = "/auth/refresh-token",
  logout = "/auth/logout",
  test = "/auth/test",
  requestChangePassword = "/auth/request-change-password",
  changePassword = "/auth/change-password",
}

export class AuthService {
  constructor() {}

  public async login(dto: LoginDto) {
    const response = await httpService.post(APIEndpoints.login, dto);
    if (!response) return;
    const session: AuthStore.session = response.data;
    this.updateSession(session);
  }
  public async register(dto: LoginDto) {
    const response = await httpService.post(APIEndpoints.register, dto);
    if (!response) return;
    const session: AuthStore.session = response.data;
    return this.updateSession(session);
  }
  public async testAuth(dto: { test: string }) {
    await httpService.post(APIEndpoints.test, dto);
  }
  public async refreshToken(dto: RefreshTokenDto): Promise<AuthStore.session> {
    try {
      const response = await axios.post(APIEndpoints.refreshToken, dto);
      const session: AuthStore.session = response.data;

      this.updateSession(session);

      return session;
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }
  public async logout() {
    await httpService.post(APIEndpoints.logout);
    this.clearSession();
  }
  public async updatePassword(dto: ChangePasswordDto) {
    await httpService.post(APIEndpoints.changePassword, dto);
  }
  public async requestChangePass(dto: ReqChangePasswordDTO) {
    try {
      let res = await httpService.post(APIEndpoints.requestChangePassword, dto);
      if (res) {
        return res.data;
      }
    } catch (e) {}
  }
  public getSession(): AuthStore.session | null {
    return store.getState().auth.session;
  }
  public clearSession(): void {
    store.dispatch(sliceStore.actions.setCredentials(initialState));
  }
  public updateSession(
    session: AuthStore.State[AuthStore.Enum.session]
  ): AuthStore.User {
    const user: AuthStore.User = jwtService.decodeToken(session!.accessToken);
    store.dispatch(
      sliceStore.actions.setCredentials({
        user,
        session,
        isAuthenticated: true,
      })
    );
    return user;
  }
}

export const authService = new AuthService();
