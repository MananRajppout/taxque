"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  className?: string;
}

interface LoadingSpinnerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = "", 
  size = "medium" 
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className={`${sizeClasses[size]} border-3 border-gray-200 border-t-orange-500 rounded-full animate-spin`}></div>
      <p className="text-gray-600 text-base m-0 font-medium">Loading...</p>
    </div>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = null,
  redirectTo = "/login",
  requireAuth = true,
  className = "",
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      
      if (isLoading) return;
      if (requireAuth && !isAuthenticated) {
        
        if (fallback) {
          setIsChecking(false);
        } else {
          router.push(redirectTo);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo, fallback]);

 
  if (isLoading || isChecking) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] py-10 px-5 ${className}`}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  return (
    <div className={`w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
};


interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  className?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/dashboard",
  className = "",
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] py-10 px-5 ${className}`}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className={`w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
};


interface RoleProtectedRouteProps extends ProtectedRouteProps {
  allowedRoles?: string[];
  userRole?: string;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  userRole,
  fallback = null,
  redirectTo = "/unauthorized",
  className = "",
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      const currentUserRole = userRole ?? user?.role;

      // If currentUserRole is not a string, treat as not allowed.
      if (allowedRoles.length > 0 && (typeof currentUserRole !== "string" || !allowedRoles.includes(currentUserRole))) {
        if (fallback) {
          setIsChecking(false);
        } else {
          router.push(redirectTo);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkRole();
  }, [isAuthenticated, isLoading, allowedRoles, userRole, user?.role, router, redirectTo, fallback]);

  if (isLoading || isChecking) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] py-10 px-5 ${className}`}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  const currentUserRole = userRole ?? user?.role;
  // If role is missing or not a string, deny access
  if (allowedRoles.length > 0 && (typeof currentUserRole !== "string" || !allowedRoles.includes(currentUserRole))) {
    return <>{fallback}</>;
  }

  return (
    <div className={`w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
};


export const AuthDebug: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className={`fixed top-2.5 right-2.5 bg-black/80 text-white p-4 rounded-lg text-xs max-w-[300px] z-[9999] md:relative md:top-auto md:right-auto md:m-2.5 md:max-w-full ${className}`}>
      <h4 className="m-0 mb-2.5 text-orange-500">Auth Debug Info</h4>
      <p className="my-1 break-all">Loading: {isLoading ? "Yes" : "No"}</p>
      <p className="my-1 break-all">Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <p className="my-1 break-all">User: {user ? JSON.stringify(user, null, 2) : "None"}</p>
    </div>
  );
};


export default ProtectedRoute;