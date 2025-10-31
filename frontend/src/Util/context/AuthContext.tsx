"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { sendOTP, verifyOTP, logout as authServiceLogout, AuthError } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  login: (userData: User) => void;
  sendOTP: (email: string) => Promise<{ success: boolean; message: string; error?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message: string; user?: User; error?: string }>;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  className = "" 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser.trim() !== "") {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
       
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  
  const login = (userData: User) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthError(null); 
    } catch (error) {
      console.error("Error saving user data:", error);
      setAuthError("Failed to save user data");
    }
  };

  const handleSendOTP = async (email: string): Promise<{ success: boolean; message: string; error?: string }> => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const response = await sendOTP(email);
      return {
        success: true,
        message: response.message
      };
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = authError.message || "Failed to send OTP";
      setAuthError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleVerifyOTP = async (email: string, otp: string): Promise<{ success: boolean; message: string; user?: User; error?: string }> => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const response = await verifyOTP(email, otp);
      
      if (response.success && response.user) {
    
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      
        login(response.user);
        
        return {
          success: true,
          message: response.message,
          user: response.user
        };
      } else {
        throw new Error(response.message || "OTP verification failed");
      }
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = authError.message || "Failed to verify OTP";
      setAuthError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

 
  const logout = async () => {
    try {
      setUser(null);
      setAuthError(null);
      
      
      await authServiceLogout();
    } catch (error) {
      console.error("Error during logout:", error);
      
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("selectedProduct");
    }
  };

  
  const isAuthenticated = Boolean(user);

  const contextValue: AuthContextType = {
    user,
    setUser,
    logout,
    login,
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    isAuthenticated,
    isLoading,
    authError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <div className={`w-full min-h-screen ${className}`}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

interface WithAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export const WithAuth: React.FC<WithAuthProps> = ({ 
  children, 
  fallback = null,
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 text-base m-0">Loading...</p>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export const AuthStatus: React.FC<{ className?: string }> = ({ 
  className = "" 
}) => {
  const { user, isAuthenticated, logout, authError } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm bg-yellow-50 text-yellow-800 border border-yellow-200 ${className}`}>
        <span>Not logged in</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {authError && (
        <div className="px-4 py-2 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200">
          <span>Error: {authError}</span>
        </div>
      )}
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm bg-green-50 text-green-800 border border-green-200">
        <span>Welcome, {user?.name || user?.email || "User"}!</span>
        <button 
          onClick={logout}
          className="bg-orange-500 hover:bg-orange-600 text-white border-none px-3 py-1.5 rounded text-xs cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          type="button"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
