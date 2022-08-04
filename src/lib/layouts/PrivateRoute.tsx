import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // const isLoggedin = useAuthStoreSelector((s: any) => s.isLoggedin);
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
