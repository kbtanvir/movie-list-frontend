import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormLogin from "./features/auth/view/forms/AuthForm";
import FormPasswordPreset from "./features/auth/view/forms/PasswordReset";
import MoviesView from "./features/movies/view/MoviesView";
import "./global.css";
import { AppRoutes } from "./lib/consts/Routes";
import PrivateRoute from "./lib/layouts/PrivateRoute";

export default function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {/* * PROTECTED ROUTES */}

          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.movies} element={<MoviesView />} />
          </Route>

          {/* * AUTH ROUTES */}

          <Route path={AppRoutes.login} element={<FormLogin />} />
          <Route path={AppRoutes.register} element={<FormLogin register />} />
          <Route
            path={AppRoutes.passwordReset}
            element={<FormPasswordPreset />}
          />

          {/* * DEFAULT ROUTE */}

          <Route path="*" element={<PrivateRoute />}>
            <Route index element={<ErrorView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function ErrorView() {
  return <div>Page Not Found</div>;
}
