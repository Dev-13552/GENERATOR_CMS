import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { LoadingIcon } from "../shared/ui/components/Icons";
import { AuthContext } from "../features/auth/state/AuthContext";

const MainProtected = () => {
  const { user, loading, isHydrating, isAuthenticated } =
    useContext(AuthContext);

  if (isHydrating)
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <LoadingIcon style="animate-spin h-12 w-12 text-indigo-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  if (!isAuthenticated) return <Navigate to={"/"} replace />;

  return <Outlet />;
};

export default MainProtected;
