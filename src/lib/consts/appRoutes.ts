export enum ControllerEnums {
  home = "/",
  login = "/login",
  register = "/register",
  movies = "/movies",
  passwordReset = "/password-reset",
}

export const AppRoutes = {
  home: ControllerEnums.home,
  login: ControllerEnums.login,
  register: ControllerEnums.register,
  movies: ControllerEnums.movies,
  passwordReset: ControllerEnums.passwordReset,
};