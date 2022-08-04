export interface StateResponse {
  status?: "loading" | "loaded" | "error";
  message?: string;
}

export namespace Auth {
  enum AuthEnum {
    user = "user",
    IsAuthenticated = "isAuthenticated",
    session = "session",
  }

  export interface session {
    accessToken: string;
    refreshToken: string;
  }
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    exp: number;
    iat: number;
  }

  export interface Selector {
    [AuthEnum.user]: User | null;
    [AuthEnum.IsAuthenticated]: boolean;
    [AuthEnum.session]: session | null;
  }
}
