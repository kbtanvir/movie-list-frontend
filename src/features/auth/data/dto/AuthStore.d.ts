import { JwtPayload } from "./JWT.dto";

export interface NetworkResponse {
  isLoading: boolean;
  error: boolean;
  message: string;
}

export interface NetworkError {
  message: string;
  statusCode: number;
}

export namespace AuthStore {
  export enum Enum {
    user = "user",
    IsAuthenticated = "isAuthenticated",
    session = "session",
  }

  export interface session {
    accessToken: string;
    refreshToken: string;
  }
  export type User = JwtPayload & {
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface State {
    [Enum.user]: User | null;
    [Enum.IsAuthenticated]: boolean;
    [Enum.session]: session | null;
  }
}
