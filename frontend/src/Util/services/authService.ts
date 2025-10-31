"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";


interface OTPResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
  };
  token?: string;
}

interface AuthError {
  message: string;
  status?: number;
  code?: string;
}


const handleAuthError = (error: any): AuthError => {
  if (error.response) {
    return {
      message: error.response.data?.message || "Authentication failed",
      status: error.response.status,
      code: error.response.data?.code,
    };
  } else if (error.request) {
    return {
      message: "Network error. Please check your connection.",
      code: "NETWORK_ERROR",
    };
  } else {
    return {
      message: error.message || "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
    };
  }
};


export const sendOTP = async (email: string): Promise<OTPResponse> => {
  try {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address");
    }

    const response = await axios.post(`${BASE_URL}/send-otp`, { 
      email: email.toLowerCase().trim() 
    });
    
    return {
      success: true,
      message: "OTP sent successfully",
      data: response.data,
    };
  } catch (error) {
    const authError = handleAuthError(error);
    throw authError;
  }
};


export const verifyOTP = async (email: string, otp: string): Promise<VerifyOTPResponse> => {
  try {
    
    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      throw new Error("OTP must be a 6-digit number");
    }

    const response = await axios.post(`${BASE_URL}/verify-otp`, { 
      email: email.toLowerCase().trim(),
      otp: otp.trim()
    });
    
    return {
      success: true,
      message: "OTP verified successfully",
      user: response.data.user,
      token: response.data.token,
    };
  } catch (error) {
    const authError = handleAuthError(error);
    throw authError;
  }
};


export const googleLogin = async (): Promise<void> => {
  try {
    window.location.href = `${BASE_URL}/google`;
  } catch (error) {
    console.error("Google login error:", error);
    throw new Error("Failed to initiate Google login");
  }
};

export const facebookLogin = async (): Promise<void> => {
  try {
    window.location.href = `${BASE_URL}/facebook`;
  } catch (error) {
    console.error("Facebook login error:", error);
    throw new Error("Failed to initiate Facebook login");
  }
};

export const linkedInLogin = async (): Promise<void> => {
  try {
    window.location.href = `${BASE_URL}/linkedin`;
  } catch (error) {
    console.error("LinkedIn login error:", error);
    throw new Error("Failed to initiate LinkedIn login");
  }
};


export const logout = async (): Promise<void> => {
  try {
    
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedProduct");
    
    
    
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    
    localStorage.clear();
    window.location.href = "/login";
  }
};


export const isAuthenticated = (): boolean => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return Boolean(user && token);
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};


export const getCurrentUser = (): any => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user.trim() === "") {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/refresh-token`);
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    console.error("Token refresh error:", error);

    await logout();
    return null;
  }
};


export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${BASE_URL}/validate-token`, { token });
    return response.data.valid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};


export type { OTPResponse, VerifyOTPResponse, AuthError };