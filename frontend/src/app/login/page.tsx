"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";


const smPageBG = "/assests/images/smPageBG.svg";
const logCover = "/assests/images/loginCover.png";
const GoogleIcon = "/assests/images/google.svg";
const FacebookIcon = "/assests/images/facebook1.svg";
const LinkedInIcon = "/assests/images/linkedin1.svg";
const rightArrow = "/assests/images/rightArrow.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";


import { useAuth } from "@/Util/context/AuthContext";


import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/slices/store";
import { CreateUser, FindUser } from "@/store/slices/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { sendOTP, verifyOTP, isLoading, authError, isAuthenticated } = useAuth();
  const [currentNav, setCurrentNav] = React.useState("");
 
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [userName, setUserName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [otpInputBox, setOtpInputBox] = useState(false);
  const [inputOTP, setInputOTP] = useState<string>("");
  const [otpTimer, setOtpTimer] = useState(60);

  const handleOtpInputBox = async () => {
    if (!userName.length || !inputEmail.length) {
      toast.warn("User name and email id required!");
      return;
    }

    if (inputEmail?.length) {
      try {
        const result = await sendOTP(inputEmail);
        if (result.success) {
          toast.success("A One Time Password has been sent to your mail!");
          setOtpInputBox(true);
          OTPExp();
        } else {
          toast.error(result.error || "Failed to send OTP");
        }
      } catch (error) {
        toast.error("Failed to send OTP");
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!inputOTP) {
      toast.warn("Please enter OTP");
      return;
    }

    try {
      const result = await verifyOTP(inputEmail, inputOTP);
      if (result.success && result.user) {
        // Handle Redux user creation/finding
        try {
          const response = await dispatch(
            FindUser({ email: inputEmail })
          ).unwrap();

          if (!response) {
            await handleCreateUser(result.user);
          } else {
            if (response._id) {
              localStorage.setItem("userId", response._id);
            }
          }
        } catch (error) {
          console.log("Redux error:", error);
        }

        toast.success("Login successfully!");
        setTimeout(() => {
          router.push("/");
        }, 600);
      } else {
        toast.error(result.error || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  
  const handleCreateUser = async (userData: any) => {
    try {
      const response = await dispatch(
        CreateUser({
          name: userName,
          email: inputEmail,
          token: userData.token || "auth-token",
        })
      ).unwrap();

      if (response._id) {
        localStorage.setItem("userId", response._id);
      }
    } catch (error: any) {
      console.error("Error creating user:", error?.error?.code);
    }
  };

  
  const OTPExp = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOtpInputBox(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setOtpInputBox(false);
    };
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
 
      <div className="w-full h-[150px] md:h-[180px] lg:h-[200px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
       
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
      </div>

    
      <div className="w-full flex justify-center items-center relative py-6 px-4">
        <div className="w-full max-w-6xl border border-gray-200 rounded-2xl bg-white shadow-lg flex flex-col lg:flex-row justify-between gap-6 p-4 lg:p-6">
     
          <div className="w-full lg:w-1/3">
            <div className="w-full h-56 lg:h-full rounded-2xl overflow-hidden">
              <Image 
                src={logCover} 
                alt="Login Cover" 
                width={400} 
                height={500} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

       
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Log In To Continue
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Log In with your existing account.
            </p>

           
            {authError && (
              <div className="w-full mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg">
                {authError}
              </div>
            )}

           
            <div className="hidden w-full flex justify-between gap-4 mb-8">
              <div className="w-1/3 h-10 border border-gray-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                <Image src={GoogleIcon} alt="Google" width={16} height={16} />
                <p className="text-xs font-semibold">Google</p>
              </div>
              <div className="w-1/3 h-10 border border-gray-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                <Image src={FacebookIcon} alt="Facebook" width={16} height={16} />
                <p className="text-xs font-semibold">Facebook</p>
              </div>
              <div className="w-1/3 h-10 border border-gray-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                <Image src={LinkedInIcon} alt="LinkedIn" width={16} height={16} />
                <p className="text-xs font-semibold">LinkedIn</p>
              </div>
            </div>

            {!otpInputBox ? (
              <>
               
                <div className="w-full mb-5">
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Enter full Name"
                    className="w-full h-12 border border-gray-300 rounded-xl px-5 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="w-full mb-5">
                  <input
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full h-12 border border-gray-300 rounded-xl px-5 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <AppBtn
                  height="50px"
                  width="100%"
                  btnText={isLoading ? "Sending..." : "Log In"}
                  icon={rightArrow}
                  onClick={handleOtpInputBox}
                  disabled={isLoading}
                />
              </>
            ) : (
              <>
               
                <div className="w-full mb-5">
                  <p className="text-xl text-red-600 mb-2 text-center">
                    00:{otpTimer}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your six digit OTP"
                    onChange={(e) => setInputOTP(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-xl px-5 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <AppBtn
                  height="50px"
                  width="100%"
                  btnText={isLoading ? "Verifying..." : "Verify Account"}
                  onClick={handleVerifyOtp}
                  disabled={isLoading || inputOTP.length !== 6}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
