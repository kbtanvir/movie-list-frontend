import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AuthForm from "./features/auth/view/forms/LoginEmailPass";
import FormPasswordPreset from "./features/auth/view/forms/PasswordReset";
import MoviesView from "./features/movies/view/MoviesView";
import PrivateRoute from "./lib/layouts/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* * PROTECTED ROUTES */}

        <Route path="/" element={<PrivateRoute children={<RootView />} />} />
        <Route
          path="/movies"
          element={<PrivateRoute children={<MoviesView />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />

        {/* * AUTH ROUTES */}

        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/password-reset" element={<FormPasswordPreset />} />
      </Routes>
    </Router>
  );
}

export default App;

function RootView() {
  useEffect(() => {}, []);

  return <div>Loading</div>;
}
