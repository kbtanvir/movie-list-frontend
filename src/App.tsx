import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AuthForm from "./features/auth/view/forms/AuthForm";
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

          <Route
            path={AppRoutes.home}
            element={<PrivateRoute element={<RootView />} />}
          />
          <Route
            path={AppRoutes.movies}
            element={<PrivateRoute element={<MoviesView />} />}
          />

          {/* * AUTH ROUTES */}

          <Route path={AppRoutes.login} element={<AuthForm />} />
          <Route path={AppRoutes.register} element={<AuthForm register />} />
          <Route
            path={AppRoutes.passwordReset}
            element={<FormPasswordPreset />}
          />

          {/* * DEFAULT ROUTE */}

          <Route path="*" element={<Navigate to={AppRoutes.home} />} />
        </Routes>
      </Router>
    </div>
  );
}

function RootView() {
  useEffect(() => {}, []);

  return <div>Loading</div>;
}
