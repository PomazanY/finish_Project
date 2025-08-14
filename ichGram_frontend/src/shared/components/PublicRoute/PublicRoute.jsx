// import { Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import useLogin from "../../hooks/useLogin";

// import { selectToken } from "../../../redux/auth/auth-selector";

// const PublicRoute = ()=> {
//     const isLogin = useLogin();
//     const token = useSelector(selectToken);

//     if(!isLogin && token) return <p>Loading...</p>;

//     if(isLogin) return <Navigate to="/" />;

//     return <Outlet />
// }

// export default PublicRoute;

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/auth/auth-selector";

export default function PublicRoute() {
  const token = useSelector(selectToken);
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/terms" || pathname === "/policy" || pathname === "/cookies") return <Outlet />;

  return token ? <Navigate to="/main" replace /> : <Outlet />;
}