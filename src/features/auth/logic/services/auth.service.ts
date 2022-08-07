import { AuthStore } from "../../data/dto/AuthStore";
import { ChangePasswordDto } from "../../data/dto/change-password.dto";
import { LoginDto } from "../../data/dto/login.dto";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import httpService from "./axios.interceptor";
import { JWTService } from "./jwt.service";

export enum APIEndpoints {
  login = "/auth/login",
  register = "/auth/register",
  refreshToken = "/auth/refresh-token",
  logout = "/auth/logout",
  test = "/auth/test",
  changePassword = "/auth/change-password",
}

export class AuthService {
  constructor() {}

  private readonly jwt = new JWTService();

  public async login({ ...data }: LoginDto) {
    const response = await httpService.post(APIEndpoints.login, data);

    if (!response) return;

    const session: AuthStore.session = response.data;

    this.jwt.updateSession(session);
  }
  public async register({ ...data }: LoginDto) {
    const response = await httpService.post(APIEndpoints.register, data);
    if (!response) return;
    const session: AuthStore.session = response.data;

    this.jwt.updateSession(session);
    return response.data;
  }
  public async testAuth({ ...data }: { test: string }) {
    const response = await httpService.post(APIEndpoints.test, data);
    return response.data;
  }
  public async refreshToken(dto: RefreshTokenDto) {
    const response = await httpService.post(APIEndpoints.refreshToken, dto);
    const session: AuthStore.session = response.data;
    this.jwt.updateSession(session);
  }
  public async logout(dto: RefreshTokenDto) {
    try {
      const response = await httpService.post(APIEndpoints.logout, dto);
      this.jwt.clearSession();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async updatePassword(dto: ChangePasswordDto) {
    await httpService.post(APIEndpoints.changePassword, dto);
  }
}
