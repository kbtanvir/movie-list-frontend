import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sliceStore } from "./features/auth/logic/slice";
import FormPasswordPreset from "./features/auth/view/forms/ChangePasswordPage/ChangePasswordPage";
import LoginForm from "./features/auth/view/forms/LoginPage/LoginPage";
import RegistrationForm from "./features/auth/view/forms/RegistrationPage/RegistrationPage";
import RequestChangePassForm from "./features/auth/view/forms/RequestChangePassPage/RequestChangePassPage";
import MoviesView from "./features/movies/view/Movies/MoviesView";
import "./global.css";
import { AppRoutes } from "./lib/consts/appRoutes";
import HeaderLayout from "./lib/layouts/Header/HeaderLayout";
export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* * PROTECTED ROUTES */}

          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.movies} element={<MoviesView />} />
            <Route path="*" element={<ErrorView />} />
            <Route path="/" element={<Navigate to={AppRoutes.movies} />} />
          </Route>

          {/* * AUTH ROUTES */}

          <Route element={<AuthRoute />}>
            <Route path={AppRoutes.login} element={<LoginForm />} />
            <Route path={AppRoutes.register} element={<RegistrationForm />} />
            <Route
              path={AppRoutes.requestChangePassword}
              element={<RequestChangePassForm />}
            />
            <Route
              path={AppRoutes.passwordReset}
              element={<FormPasswordPreset />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

function ErrorView() {
  return <div>Page Not Found</div>;
}

function PrivateRoute() {
  const { isAuthenticated } = useSelector(sliceStore.state);

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.login} />;
  }

  return (
    <>
      <HeaderLayout />
      <div className="page-wrapper">
        <Outlet />
      </div>
    </>
  );
}

function AuthRoute() {
  const { isAuthenticated } = useSelector(sliceStore.state);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="auth-wrapper"></div>
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
}
