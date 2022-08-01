// import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../consts/Routes";
// import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
// import { verifyJwt } from '../authSlice';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  // const { isSuccess, isAuthenticated, jwt } = useAppSelector(
  //   (state) => state.auth
  // );

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!jwt || !jwt?.token) return;

  //   dispatch(verifyJwt(jwt.token));
  // }, [jwt, isSuccess]);

  return false ? element : <Navigate replace to={AppRoutes.login} />;
};

export default PrivateRoute;
