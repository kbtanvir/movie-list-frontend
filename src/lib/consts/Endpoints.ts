export const Endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh-token",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
  },
  movies: {
    all: "/movies",
    getById: "/movies/:id",
  },
};
