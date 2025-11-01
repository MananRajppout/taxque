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
import { FetchService } from "@/store/slices/serviceSlice";
import { FetchCategory } from "@/store/slices/categorySlice";
import type { ServiceDataType } from "@/store/slices/serviceSlice";

const ServiceCard = ({ 
  service 
}: { 
  service: ServiceDataType 
}) => {
  const router = useRouter();
  
  // Get description from overview or displayName
  const description = service.overView?.summarys?.[0] 
    || service.displayName 
    || `${service.title} service`;
  
  const handleClick = () => {
    if (service.Slug) {
      router.push(`/services/${service.Slug}`);
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      {/* Top Section */}
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image
              src="/assests/images/ITNIcon.svg"
              alt="Service Icon"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">{description}</p>
          </div>
        </div>
        
        {/* Read More Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm"
        >
          Read More
        </button>
      </div>
      
      {/* Bottom Image Section */}
      <div className="h-24 md:h-32 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center justify-center">
        <Image
          src="/piv.jpg"
          alt="ELARA SPARES and Engineering"
          width={200}
          height={80}
          className="object-contain max-h-full max-w-full"
        />
      </div>
    </div>
  );
};

// Floating Action Buttons
const FloatingButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openChat = () => {
    // Implement chat functionality
    console.log("Chat opened");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 md:gap-3 z-50">
      {/* Chat Button */}
      <button
        onClick={openChat}
        className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center"
        aria-label="Open chat"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      
      <button
        onClick={scrollToTop}
        className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
          <path d="M12 2L2 12H8V22H16V12H22L12 2Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
};

export default function OurServicesPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Services");
  
  // Get data from Redux store
  const { data: services, status: serviceStatus } = useSelector((state: RootState) => state.service);
  const { data: categories, status: categoryStatus } = useSelector((state: RootState) => state.category);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(FetchService());
    dispatch(FetchCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Group services by category
  const servicesByCategory = useMemo(() => {
    if (!services.length || !categories.length) return [];

    return categories
      .map((category) => {
        const categoryServices = services.filter(
          (service) => service.category?.id === category._id && (service as any).status !== "draft"
        );
        
        if (categoryServices.length === 0) return null;
        
        return {
          category: category.title || category.category || "Other Services",
          categoryId: category._id,
          services: categoryServices,
        };
      })
      .filter(Boolean) as Array<{
        category: string;
        categoryId?: string;
        services: ServiceDataType[];
      }>;
  }, [services, categories]);

  const isLoading = serviceStatus === "loading" || categoryStatus === "loading";
  const hasError = serviceStatus === "error" || categoryStatus === "error";

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      {/* Breadcrumb */}
      <div className="px-4 md:px-8 lg:px-16 pt-20 pb-4">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Our Comprehensive Services
          </h1>
        
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading services...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && !isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-xl mb-4">Failed to load services</p>
                <button
                  onClick={() => {
                    dispatch(FetchService());
                    dispatch(FetchCategory());
                  }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Services by Category */}
          {!isLoading && !hasError && (
            <div className="space-y-12 md:space-y-16">
              {servicesByCategory.length > 0 ? (
                servicesByCategory.map((section, sectionIndex) => (
                  <div key={section.categoryId || sectionIndex} className="w-full">
                    {/* Section Title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
                      {section.category}
                    </h2>

                    {/* Service Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {section.services.map((service) => (
                        <ServiceCard
                          key={service._id}
                          service={service}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No services available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>


      <FloatingButtons />

      {/* Subscribe Section */}
      <div className="bg-gray-50 py-8 md:py-12">
      <Subscribe />
      </div>

      <Footer />
    </div>
  );
}
