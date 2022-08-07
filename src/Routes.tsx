import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { sliceStore } from "./features/auth/logic/slice";
import FormPasswordPreset from "./features/auth/view/forms/ForgotPasswordForm/ForgotPasswordForm";
import LoginForm from "./features/auth/view/forms/LoginForm/LoginForm";
import RegistrationForm from "./features/auth/view/forms/RegistrationForm/RegistrationForm";
import MoviesView from "./features/movies/view/MoviesView";
import "./global.css";
import { AppRoutes } from "./lib/consts/appRoutes";

function PrivateRoute() {
  const { isAuthenticated } = useSelector(sliceStore.state);

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.login} />;
  }
  return <Outlet />;
}
function AuthRoutes() {
  const { isAuthenticated } = useSelector(sliceStore.state);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {/* * PROTECTED ROUTES */}

          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.movies} element={<MoviesView />} />
            <Route path="*" element={<ErrorView />} />
            <Route path="/" element={<Navigate to={AppRoutes.movies} />} />
          </Route>

          {/* * AUTH ROUTES */}

          <Route element={<AuthRoutes />}>
            <Route path={AppRoutes.login} element={<LoginForm />} />
            <Route path={AppRoutes.register} element={<RegistrationForm />} />
            <Route
              path={AppRoutes.passwordReset}
              element={<FormPasswordPreset />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function ErrorView() {
  return <div>Page Not Found</div>;
}
