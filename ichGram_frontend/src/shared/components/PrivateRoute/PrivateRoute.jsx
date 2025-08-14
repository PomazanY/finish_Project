import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/auth/auth-selector";

const PrivateRoute = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

// import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectToken } from "../../../redux/auth/auth-selector";

// export default function PrivateRoute() {
//   const token = useSelector(selectToken);
//   const location = useLocation();

//   // НЕ делайте тут "Loading..." ни при каких условиях
//   return token ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
// }