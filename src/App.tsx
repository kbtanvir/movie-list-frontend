import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import FormLogin from "./features/auth/view/forms/AuthForm";
import FormPasswordPreset from "./features/auth/view/forms/PasswordReset";
import MoviesView from "./features/movies/view/MoviesView";
import "./global.css";
import { AppRoutes } from "./lib/consts/Routes";

function PrivateRoute() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
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
            <Route path="/" element={<Navigate to={"/login"} />} />
          </Route>

          {/* * AUTH ROUTES */}

          <Route path={AppRoutes.login} element={<FormLogin />} />
          <Route path={AppRoutes.register} element={<FormLogin register />} />
          <Route
            path={AppRoutes.passwordReset}
            element={<FormPasswordPreset />}
          />
        </Routes>
      </Router>
    </div>
  );
}

function ErrorView() {
  return <div>Page Not Found</div>;
}
