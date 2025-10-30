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
  const [visibleCount, setVisibleCount] = React.useState(6);

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

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {Array.isArray(data) && data.length > 0 ? (
                data.slice(0, visibleCount).map((job) => (
                  <JobCard
                    key={job._id || job.title}
                    _id={job._id}
                    title={job.title}
                    description={job.description}
                    location={job.location}
                    experience={job.experience}
                    salary={job.salary}
                    type={job.type}
                  />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center text-gray-600">
                  No openings available right now.
                </div>
              )}
            </div>

            {Array.isArray(data) && data.length > visibleCount && (
              <div className="flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  Load more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
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