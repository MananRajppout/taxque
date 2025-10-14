"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (use public paths)
const smPageBG = "/assests/images/smPageBG.svg";

export default function CustomNotFoundPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex flex-col relative bg-transparent text-black">
        {/* Background Image */}
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span className="text-gray-800 font-medium">404 - Page Not Found</span>
          </p>
        </div>

        {/* Main Heading */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            Oops! Page Not Found
          </h1>
        </div>
      </div>

      {/* 404 Content */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="mb-8">
              <h2 className="text-8xl md:text-9xl font-bold mb-4">404</h2>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h3>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, let's get you back on track!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push("/")}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Go to Home
              </button>
              <button
                onClick={() => router.back()}
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Go Back
              </button>
            </div>

            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-blue-400">
              <h4 className="text-xl font-semibold mb-4">Need Help?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🏠</span>
                  </div>
                  <h5 className="font-semibold mb-2">Visit Homepage</h5>
                  <p className="text-sm">Start fresh from our homepage</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📞</span>
                  </div>
                  <h5 className="font-semibold mb-2">Contact Support</h5>
                  <p className="text-sm">Get help from our support team</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🔍</span>
                  </div>
                  <h5 className="font-semibold mb-2">Search Services</h5>
                  <p className="text-sm">Find what you're looking for</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
