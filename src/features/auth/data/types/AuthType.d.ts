export interface StateResponse {
  status?: "loading" | "loaded" | "error";
  message?: string;
}

export namespace AuthType {
  enum Enum {
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
    [Enum.user]: User | null;
    [Enum.IsAuthenticated]: boolean;
    [Enum.session]: session | null;
  }
}
