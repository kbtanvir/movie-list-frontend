import store from "../../../../lib/store/store";
import { AuthStore } from "../../data/dto/AuthStore";
import { LoginDto } from "../../data/dto/login.dto";
import { RefreshTokenDto } from "../../data/dto/refresh-token.dto";
import { initialState } from "../slice/initialState";
import { sliceStore } from "./../slice/index";
import httpService from "./axios.interceptor";

export enum APIEndpoints {
  login = "/auth/login",
  register = "/auth/register",
  refreshToken = "/auth/refresh-token",
  logout = "/auth/logout",
  test = "/auth/test",
}

export class AuthService {
  constructor() {}

  public readonly isLoading = false;
  public readonly message = "";
  public readonly user = null;

  public async login({ ...data }: LoginDto): Promise<AuthStore.session> {
    try {
      const response = await httpService.post(APIEndpoints.login, data);

      // * UPDATE SESSION
      // * --------------

      const session: AuthStore.session = response.data;
      store.dispatch(sliceStore.actions.setCredentials({ session }));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async register({ ...data }: LoginDto): Promise<any | undefined> {
    try {
      const response = await httpService.post(APIEndpoints.register, data);

      // * UPDATE SESSION
      // * --------------

      const session: AuthStore.session = response.data;
      store.dispatch(sliceStore.actions.setCredentials({ session }));

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  public async testAuth({ ...data }: { test: string }): Promise<any> {
    try {
      const response = await httpService.post(APIEndpoints.test, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async refreshToken(dto: RefreshTokenDto): Promise<any> {
    try {
      const response = await httpService.post(APIEndpoints.refreshToken, dto);
      // * UPDATE SESSION
      // * --------------

      const session: AuthStore.session = response.data;
      store.dispatch(sliceStore.actions.setCredentials({ session }));

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async logout(dto: RefreshTokenDto): Promise<any> {
    try {
      const response = await httpService.post(APIEndpoints.logout, dto);
      store.dispatch(sliceStore.actions.setCredentials(initialState));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
