"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (public path)
const pageBg = "/assests/images/otherPageBg.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/Tools";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchBlog } from "@/store/slices/blogSlice";

const BlogCategoryList = [
  "Income Tax",
  "TDS Compliance", 
  "Goods and Service Tax",
  "Updates",
  "Business",
  "Registration",
  "Private Company",
  "Section 8 Company",
  "LLP",
  "ROC Filings",
  "Compliance",
  "Finance",
  "Accounting & Bookkeeping",
  "Trademark",
  "Copyright",
  "Import & Export",
  "Tools",
];

export default function BlogPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.blog);
  const [blogType, setBlogType] = useState<string>();
  const [currentNav, setCurrentNav] = React.useState("Blog");

  // Show only published posts; treat missing status as Published for backward compatibility
  const publishedOnly = Array.isArray(data)
    ? data.filter((b) => (b.status ?? "Published") === "Published")
    : data;

  const filterBlogData = blogType?.length
    ? publishedOnly?.filter((val) => val.category === blogType)
    : publishedOnly;

  useEffect(() => {
    dispatch(FetchBlog());
    if (data?.length < 0) {
      dispatch(FetchBlog());
    }
  }, [dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <span className="text-gray-800 font-medium">
              {blogType === undefined ? "All Categories" : blogType}
            </span>
          </p>
        </div>

        {/* Main Heading */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            News & Press Releases
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="hidden lg:block text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Explore {!blogType?.length ? "All Categories" : blogType}
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="sticky top-20">
                <div className="w-full flex flex-col gap-2 rounded-xl overflow-hidden shadow-lg">
                  {/* All Categories Header */}
                  <div
                    className="w-full h-14 flex items-center px-5 bg-blue-900 text-white rounded-t-xl cursor-pointer hover:bg-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setBlogType(undefined);
                      goTop();
                    }}
                  >
                    <p className="font-medium">All Blog Categories</p>
                  </div>

                 
                  {BlogCategoryList?.map((el, i) => (
                    <div
                      className={`w-full h-14 flex items-center px-5 cursor-pointer transition-all duration-300 ease-in-out ${
                        blogType === el 
                          ? "bg-green-200 text-blue-900 font-medium" 
                          : "bg-yellow-50 text-blue-900 hover:bg-green-100"
                      }`}
                      onClick={() => {
                        setBlogType(el);
                        goTop();
                      }}
                      key={i}
                    >
                      <p>{el}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/4">
            
              <h2 className="lg:hidden text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
                Explore {!blogType?.length ? "All Categories" : blogType}
              </h2>

           
              <div className="w-full space-y-4">
                {filterBlogData?.map((el, i) => (
                  <React.Fragment key={i}>
                    <BlogCard {...el} />
                    {i !== data.length - 1 && (
                      <div className="w-full border-t border-gray-300 my-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
