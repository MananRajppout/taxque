"use client";

import React, { useEffect, useState } from "react";
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
import { FetchService } from "@/store/slices/serviceSlice";
import type { CategoryDataType } from "@/store/slices/categorySlice";
import type { ServiceDataType } from "@/store/slices/serviceSlice";

// Category Card Component (similar to old ServiceCard)
const CategoryCard = ({ 
  category 
}: { 
  category: CategoryDataType 
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (category.Slug) {
      router.push(`/category/${category.Slug}`);
    }
  };

  // Truncate summary for display
  const truncatedSummary = category.summary 
    ? category.summary.slice(0, 150) + (category.summary.length > 150 ? "..." : "")
    : "Explore our comprehensive services in this category.";

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
              alt="Category Icon"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">{category.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">{truncatedSummary}</p>
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
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.imgAltTag || category.title}
            width={200}
            height={80}
            className="object-contain max-h-full max-w-full"
          />
        ) : (
          <div className="text-white text-sm font-semibold">{category.title}</div>
        )}
      </div>
    </div>
  );
};


// Main Category List - matches old MainCategoryList structure
const MainCategoryList = [
  { title: "Income Tax Services" },
  { title: "Goods and Services Tax (GST)" },
  { title: "Startup Services" },
  { title: "Compliance Services" },
  { title: "MCA Services" },
  { title: "Registrations" },
  { title: "Intellectual Property Rights (IPR)" },
  { title: "Accounting" },
];

export default function OurServicesPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Services");
  
  // Get data from Redux store
  const { data: categories, status: categoryStatus } = useSelector((state: RootState) => state.category);
  const { data: services, status: serviceStatus } = useSelector((state: RootState) => state.service);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(FetchCategory());
    dispatch(FetchService());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Service Card Component
  const ServiceCard = ({ service }: { service: ServiceDataType }) => {
    const router = useRouter();
    
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
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">{service.title || service.displayName}</h3>
              {service.overView?.summarys?.[0] && (
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {service.overView.summarys[0].slice(0, 150)}{service.overView.summarys[0].length > 150 ? "..." : ""}
                </p>
              )}
            </div>
          </div>
          
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
      </div>
    );
  };

  // Group categories by main category sections
  const renderCategoryCards = (mainCategoryTitle: string) => {
    const filteredCategories = categories.filter(
      (cat) => cat.category === mainCategoryTitle
    );
    
    if (filteredCategories.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    );
  };

  // Group services by actual category sections (using service category field)
  const renderServiceCards = (mainCategoryTitle: string) => {
    // Find categories that belong to this main category
    const mainCategoryIds = categories
      .filter((cat) => cat.category === mainCategoryTitle)
      .map((cat) => cat._id);
    
    // Filter services that match these categories OR have category title matching main category
    const filteredServices = services.filter((service) => {
      const serviceCategoryTitle = service.category?.title || "";
      
      // Check if service category matches any category ID
      if (service.category?.id && mainCategoryIds.includes(service.category.id)) {
        return true;
      }
      // Check if service category title matches main category title
      if (serviceCategoryTitle === mainCategoryTitle) {
        return true;
      }
      // Check if any category in this main group has matching title
      const matchingCategory = categories.find(
        (cat) => cat.category === mainCategoryTitle && 
        (cat.title === serviceCategoryTitle || cat._id === service.category?.id)
      );
      return !!matchingCategory;
    });
    
    if (filteredServices.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    );
  };

  // Group services by their actual category titles
  const renderServicesByActualCategory = () => {
    // Get all unique category titles from services
    const uniqueCategoryTitles = Array.from(
      new Set(
        services
          .map((service) => service.category?.title)
          .filter((title): title is string => !!title)
      )
    );

    // Get services without category titles
    const uncategorizedServices = services.filter(
      (service) => !service.category?.title
    );

    if (uniqueCategoryTitles.length === 0 && uncategorizedServices.length === 0) return null;

    return (
      <div className="space-y-12 md:space-y-16">
        {uniqueCategoryTitles.map((categoryTitle) => {
          const categoryServices = services.filter(
            (service) => service.category?.title === categoryTitle
          );

          if (categoryServices.length === 0) return null;

          return (
            <div
              key={categoryTitle}
              id={categoryTitle.replace(/\s+/g, "").toUpperCase()}
              className="category-section"
            >
              {/* Section Title */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
                {categoryTitle}
              </h2>
              
              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {categoryServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Services without category titles */}
        {uncategorizedServices.length > 0 && (
          <div
            id="UNCATEGORIZED"
            className="category-section"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
              Other Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {uncategorizedServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const isLoading = categoryStatus === "loading" || serviceStatus === "loading";
  const hasError = categoryStatus === "error" || serviceStatus === "error";

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

          {/* Categories and Services Grouped by Sections */}
          {!isLoading && !hasError && (
            <div className="space-y-12 md:space-y-16">
              {MainCategoryList.map((mainCategory, index) => {
                const categoryCards = renderCategoryCards(mainCategory.title);
                
                // Show section only if it has categories (services are shown separately by actual categories)
                if (!categoryCards) return null;
                
                return (
                  <div
                    key={index}
                    id={mainCategory.title.replace(/\s+/g, "").toUpperCase()}
                    className="category-section"
                  >
                    {/* Section Title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
                      {mainCategory.title}
                    </h2>
                    
                    {/* Category Cards Grid */}
                    {categoryCards}
                  </div>
                );
              })}
              
              {/* Show message if no categories or services found */}
              {MainCategoryList.every((mainCat) => {
                const categoryCards = renderCategoryCards(mainCat.title);
                return !categoryCards;
              }) && services.length === 0 && categories.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No categories or services available at the moment.</p>
                </div>
              )}

              {/* Services Grouped by Actual Category Titles */}
              {renderServicesByActualCategory()}
            </div>
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
