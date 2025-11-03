"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

// Service Card Component (ProductCard from old version)
const ProductCard = ({
  title,
  feturePoints,
  priceData,
  Slug,
}: ServiceDataType) => {
  const router = useRouter();
  const ProductStanderPrice = priceData?.length ? priceData[0]?.price : "2999";
  const ProductBasicPrice = priceData?.length
    ? priceData[0]?.basicPrice
    : "4599";

  const handleClickProductCard = () => {
    if (Slug) {
      router.push(`/services/${Slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1 cursor-pointer"
      onClick={handleClickProductCard}
    >
      {/* Header Section */}
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
            <h3 
              className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight cursor-pointer"
              onClick={handleClickProductCard}
            >
              {title}
            </h3>
          </div>
        </div>
        <div className="border-t border-green-200 my-3"></div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm text-gray-600">
              Basic Price: <span className="line-through">₹{ProductBasicPrice}</span>
            </p>
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-gray-700">4.8</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-3 h-3 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Price: </span>
            <p className="text-lg md:text-xl font-bold text-gray-900">
              ₹{ProductStanderPrice} <span className="text-sm font-normal text-gray-600">/month</span>
            </p>
          </div>
        </div>

        {/* Feature Points */}
        {feturePoints && feturePoints.length > 0 && (
          <div className="mb-4 space-y-2">
            {feturePoints.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs md:text-sm text-gray-600">{feature.summary}</p>
              </div>
            ))}
          </div>
        )}

        {/* Choose Plan Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClickProductCard();
          }}
          className="w-full bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-2 px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};


export default function CategoryServicesPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Services");
  
  const slug = params?.slug as string;

  // Get data from Redux store
  const { data: services, status: serviceStatus } = useSelector((state: RootState) => state.service);
  const { data: categories, status: categoryStatus } = useSelector((state: RootState) => state.category);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(FetchService());
    dispatch(FetchCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Find current category and filter services
  const currentCategory = categories.find((val) => val?.Slug === slug);
  const filteredServices = services.filter(
    (service) => 
      service.category?.id === currentCategory?._id || 
      service.category?.title === currentCategory?.title ||
      service.category?.id === currentCategory?.Slug
  );

  const isLoading = serviceStatus === "loading" || categoryStatus === "loading";
  const hasError = serviceStatus === "error" || categoryStatus === "error";

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 pt-20 pb-8">
        <div className="px-4 md:px-8 lg:px-16">
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
              <span 
                onClick={() => router.push("/our-services")}
                className="hover:text-orange-600 cursor-pointer"
              >
                Services
              </span>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-600">{currentCategory?.title || currentCategory?.category || "Category"}</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Category Related Service
            </h1>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
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

          {/* Services Grid */}
          {!isLoading && !hasError && (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredServices.map((service) => (
                    <ProductCard key={service._id} {...service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No services available in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-gray-50 py-8 md:py-12">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}

