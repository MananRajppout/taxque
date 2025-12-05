"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchCategory } from "@/store/slices/categorySlice";
import type { CategoryDataType } from "@/store/slices/categorySlice";

// Helper function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  // Remove HTML tags using regex
  return html.replace(/<[^>]*>/g, '').trim();
};

// Helper function to get icon based on category title
const getCategoryIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('gst')) {
    return (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    );
  } else if (lowerTitle.includes('tax') || lowerTitle.includes('income')) {
    return (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    );
  } else if (lowerTitle.includes('compliance') || lowerTitle.includes('roc')) {
    return (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
      </svg>
    );
  } else if (lowerTitle.includes('registration') || lowerTitle.includes('business')) {
    return (
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
      </svg>
    );
  }
  // Default icon
  return (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
    </svg>
  );
};

// Category Card Component - Matching image design
const CategoryCard = ({ 
  category 
}: { 
  category: CategoryDataType 
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (category.Slug) {
      router.push(`/category/${category.Slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Strip HTML tags and truncate
  const cleanSummary = category.summary ? stripHtmlTags(category.summary) : "";
  const truncatedSummary = cleanSummary 
    ? cleanSummary.slice(0, 100) + (cleanSummary.length > 100 ? "..." : "")
    : "Explore our comprehensive services in this category.";

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
      onClick={handleClick}
    >
      {/* Card Header: Icon, Title, and Arrow in one row */}
      <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3">
        {/* Left: Green Gradient Icon */}
        <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          {getCategoryIcon(category.title)}
        </div>
        
        {/* Center: Title - takes remaining space */}
        <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight flex-1 min-w-0">
          {category.title}
        </h3>
        
        {/* Right: Blue Circular Arrow Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <div className="px-3 md:px-4 pb-3">
        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
          {truncatedSummary}
        </p>
      </div>

      {/* Category Image */}
      {category.imageUrl && (
        <div className="w-full h-32 md:h-40 relative overflow-hidden">
          <Image
            src={category.imageUrl}
            alt={category.imgAltTag || category.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
};

export default function OurServicesPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Services");
  
  // Get data from Redux store - only categories
  const { data: categories, status: categoryStatus } = useSelector((state: RootState) => state.category);

  // Fetch data on component mount - only categories
  useEffect(() => {
    dispatch(FetchCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = categoryStatus === "loading";
  const hasError = categoryStatus === "error";

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      <div className="px-4 md:px-8 lg:px-16 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-orange-500 mb-6">
            <span 
              onClick={() => router.push("/")}
              className="hover:text-orange-600 cursor-pointer"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">Services</span>
          </nav>

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 rounded-2xl p-6 md:p-10 mb-10 border border-gray-200 shadow-md">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
              Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Service Categories</span>
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mb-6">
              Explore our comprehensive service categories covering tax, compliance, business registration, and more. 
              Each category contains multiple professional services to help you stay compliant and grow your business.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-700">
                ✔ 100% Online Process
              </div>
              <div className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-700">
                ✔ Expert Support
              </div>
              <div className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-700">
                ✔ Fast Processing
              </div>
              <div className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-700">
                ✔ Dedicated Help
              </div>
            </div>
          </section>


          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading categories...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && !isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-xl mb-4">Failed to load categories</p>
                <button
                  onClick={() => {
                    dispatch(FetchCategory());
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Categories Grid */}
          {!isLoading && !hasError && (
            <>
              {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {categories.map((category, index) => (
                    <CategoryCard key={`cat-${category._id || index}`} category={category} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No categories found.</p>
                </div>
              )}
            </>
          )}

          {/* CTA Banner */}
          <section className="mt-12 bg-gray-900 text-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Not sure which category you need?</h3>
              <p className="text-sm md:text-base text-gray-300">Explore our categories to find the right services for your business needs.</p>
            </div>
            <button
              onClick={() => router.push("/contact-us")}
              className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all whitespace-nowrap"
            >
              Talk to an Expert →
            </button>
          </section>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-white py-8 md:py-12">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}
