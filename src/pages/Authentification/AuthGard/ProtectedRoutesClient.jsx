import React from "react";
import { Navigate,  useLocation } from "react-router-dom/dist";
// import { isExpired, decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
// import Cookies from "universal-cookie";
export default function ProtectedRoutesClient({ children }) {
  const state = useSelector((state) => state.client.value);
  let location = useLocation();

  if (Object.keys(state).length === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
