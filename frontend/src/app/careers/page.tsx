"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (use public paths)
const pageBg = "/assests/images/otherPageBg.svg";
const rightArrow = "/assests/images/rightArrow.svg";
const arrowLine = "/assests/images/arrowLine.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { JobCard } from "@/components/Tools";
import { AppBtn } from "@/components/Button";
import Subscribe from "@/components/Subscribe";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchJob } from "@/store/slices/jobSlice";

export default function CareersPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.job);
  const [currentNav, setCurrentNav] = React.useState("Careers");

  useEffect(() => {
    if (data?.length <= 0) {
      dispatch(FetchJob());
    }
  }, [dispatch, data]);

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="w-full h-[200px] flex flex-col relative bg-transparent text-black md:h-[250px] lg:h-[300px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <Image src={pageBg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Careers</span>
          </p>
        </div>

        {/* Main Heading */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            DO YOU HAVE IT IN YOU?
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-12">
        <div className="w-full max-w-7xl mx-auto">
          {/* Join Team Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
            {/* Left Side - Join Team */}
            <div className="w-full lg:w-2/5">
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center lg:text-left mb-8">
                  Join our team
                </h2>
                <div className="w-full">
                  <Image 
                    src={arrowLine} 
                    alt="Arrow Line" 
                    width={300} 
                    height={100} 
                    className="w-full h-auto rotate-180 lg:rotate-0"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full lg:w-3/5">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Looking for a career, collaborative team and unlimited opportunities to grow? You've come to the right place. At Taxque, you'll be part of a leading legal-tech team that values expert insights, bold ideas and intellectual courage. You will find your place in an environment built on strong relationships where every associate is empowered to make an impact and is valued for their contributions. We invite you to apply at{" "}
                <span className="text-orange-500 font-medium">hr@Taxque.com</span>{" "}
                or choose the opportunities that suit you best from the given list of open positions.
              </p>
            </div>
          </div>

          {/* Career Opportunities Section */}
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Career opportunities
            </h2>
            
            {/* Static Job Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Frontend Developer Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                  {/* Job Type Tag */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      Hybrid
                    </span>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Job Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Frontend Developer</h3>
                  
                  {/* Location and Employment Type */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Bangalore, India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Full-time</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  {/* Job Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      A Legal Advisor provides expert legal guidance and support to an organization or individual, ensuring compliance with laws and regulations while mitigating legal risks. This role involves advising on legal matters, drafting and reviewing contracts, and representing the organization in legal proceedings.
                    </p>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">React</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">JavaScript</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">CSS</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">HTML</span>
                    </div>
                  </div>
                  
                  {/* Apply Now Button */}
                  <button 
                    onClick={() => router.push("/careerDetail/frontend-developer")}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Apply Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Backend Engineer Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
                  {/* Job Type Tag */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      Remote
                    </span>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a7 7 0 017-7h0a7 7 0 017 7M5 12a7 7 0 00-7 7h0a7 7 0 007-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Job Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Backend Engineer</h3>
                  
                  {/* Location and Employment Type */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Bangalore, India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Full-time</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  {/* Job Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Seeking an experienced Backend Engineer to develop scalable APIs and microservices. You will collaborate with designers, backend developers, and product managers to deliver high-quality user interfaces.
                    </p>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Node.js</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Python</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">API</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Database</span>
                    </div>
                  </div>
                  
                  {/* Apply Now Button */}
                  <button 
                    onClick={() => router.push("/careerDetail/backend-engineer")}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Apply Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2">
                Load more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}