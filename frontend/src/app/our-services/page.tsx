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
import { FetchService } from "@/store/slices/serviceSlice";
import type { CategoryDataType } from "@/store/slices/categorySlice";
import type { ServiceDataType } from "@/store/slices/serviceSlice";

// Helper function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  // Remove HTML tags using regex
  return html.replace(/<[^>]*>/g, '').trim();
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

// Service Card Component - New Layout
const ServiceCard = ({ service }: { service: ServiceDataType }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (service.Slug) {
      router.push(`/services/${service.Slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const ProductStanderPrice = service.priceData?.length ? service.priceData[0]?.price : "2999";
  const categoryTitle = service.category?.title || "Service";

  return (
    <div 
      className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight flex-1">
          {service.title || service.displayName}
        </h3>
        <span className="text-xs px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold whitespace-nowrap">
          {categoryTitle}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {(() => {
          const desc = service.overView?.summarys?.[0] || service.metaDescription || "";
          const cleanDesc = desc ? stripHtmlTags(desc) : "";
          return cleanDesc 
            ? cleanDesc.slice(0, 120) + (cleanDesc.length > 120 ? "..." : "")
            : "Professional service to help you with your needs.";
        })()}
      </p>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <span className="text-gray-500 block mb-1">Type</span>
          <span className="text-gray-900 font-semibold">{categoryTitle}</span>
        </div>
        <div>
          <span className="text-gray-500 block mb-1">Mode</span>
          <span className="text-gray-900 font-semibold">Online</span>
        </div>
        {service.feturePoints && service.feturePoints.length > 0 && (
          <>
            <div>
              <span className="text-gray-500 block mb-1">Includes</span>
              <span className="text-gray-900 font-semibold line-clamp-1">
                {service.feturePoints[0]?.title || "Features"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Benefits</span>
              <span className="text-gray-900 font-semibold">Expert Support</span>
            </div>
          </>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="text-sm text-black">
          From <strong className="text-orange-600 text-base">₹{ProductStanderPrice}</strong>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full transition-all duration-200"
        >
          View →
        </button>
      </div>
    </div>
  );
};

// Category Card Component - New Layout
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
    ? cleanSummary.slice(0, 120) + (cleanSummary.length > 120 ? "..." : "")
    : "Explore our comprehensive services in this category.";

  return (
    <div 
      className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight flex-1">
          {category.title}
        </h3>
        <span className="text-xs px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold whitespace-nowrap">
          Category
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {truncatedSummary}
      </p>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <span className="text-gray-500 block mb-1">Type</span>
          <span className="text-gray-900 font-semibold">Category</span>
        </div>
        <div>
          <span className="text-gray-500 block mb-1">Services</span>
          <span className="text-gray-900 font-semibold">Multiple</span>
        </div>
        <div>
          <span className="text-gray-500 block mb-1">Mode</span>
          <span className="text-gray-900 font-semibold">Online</span>
        </div>
        <div>
          <span className="text-gray-500 block mb-1">Support</span>
          <span className="text-gray-900 font-semibold">Expert Help</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          Explore Services
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full transition-all duration-200"
        >
          View →
        </button>
      </div>
    </div>
  );
};

export default function OurServicesPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Services");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Recommended");
  
  // Get data from Redux store
  const { data: categories, status: categoryStatus } = useSelector((state: RootState) => state.category);
  const { data: services, status: serviceStatus } = useSelector((state: RootState) => state.service);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(FetchCategory());
    dispatch(FetchService());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get unique category titles for filter chips
  const availableCategories = useMemo(() => {
    const categoryTitles = new Set<string>();
    categories.forEach(cat => {
      if (cat.category) categoryTitles.add(cat.category);
    });
    services.forEach(service => {
      if (service.category?.title) categoryTitles.add(service.category.title);
    });
    return Array.from(categoryTitles).sort();
  }, [categories, services]);

  // Combine categories and services for unified display
  const allItems = useMemo(() => {
    const items: Array<{ type: 'category' | 'service'; data: CategoryDataType | ServiceDataType }> = [];
    
    // Add categories
    categories.forEach(cat => {
      items.push({ type: 'category', data: cat });
    });
    
    // Add services
    services.forEach(service => {
      items.push({ type: 'service', data: service });
    });
    
    return items;
  }, [categories, services]);

  // Filter items based on selected filter and search
  const filteredItems = useMemo(() => {
    let filtered = allItems;

    // Filter by category
    if (selectedFilter !== "All") {
      filtered = filtered.filter(item => {
        if (item.type === 'category') {
          const cat = item.data as CategoryDataType;
          return cat.category === selectedFilter;
        } else {
          const service = item.data as ServiceDataType;
          return service.category?.title === selectedFilter;
        }
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        const title = item.type === 'category' 
          ? (item.data as CategoryDataType).title 
          : (item.data as ServiceDataType).title || (item.data as ServiceDataType).displayName;
        const summary = item.type === 'category'
          ? (item.data as CategoryDataType).summary
          : (item.data as ServiceDataType).overView?.summarys?.[0] || (item.data as ServiceDataType).metaDescription;
        
        return title?.toLowerCase().includes(query) || summary?.toLowerCase().includes(query);
      });
    }

    // Sort items
    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => {
        if (a.type === 'category') return 1;
        if (b.type === 'category') return -1;
        const priceA = (a.data as ServiceDataType).priceData?.[0]?.price || "9999";
        const priceB = (b.data as ServiceDataType).priceData?.[0]?.price || "9999";
        return parseInt(priceA) - parseInt(priceB);
      });
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => {
        if (a.type === 'category') return 1;
        if (b.type === 'category') return -1;
        const priceA = (a.data as ServiceDataType).priceData?.[0]?.price || "0";
        const priceB = (b.data as ServiceDataType).priceData?.[0]?.price || "0";
        return parseInt(priceB) - parseInt(priceA);
      });
    }

    return filtered;
  }, [allItems, selectedFilter, searchQuery, sortBy]);

  const isLoading = categoryStatus === "loading" || serviceStatus === "loading";
  const hasError = categoryStatus === "error" || serviceStatus === "error";

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
              Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Comprehensive Services</span>
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mb-6">
              Professional tax, compliance, and business services to help you stay compliant and grow your business. 
              Expert guidance, online processing, and dedicated support for every service.
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

          {/* Filters Section */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2 flex-1">
                <button
                  onClick={() => setSelectedFilter("All")}
                  className={`px-4 py-2 text-sm rounded-full border transition-all whitespace-nowrap ${
                    selectedFilter === "All"
                      ? "bg-orange-50 border-orange-500 text-orange-600 font-semibold"
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  All
                </button>
                {availableCategories.slice(0, 6).map((catTitle) => (
                  <button
                    key={catTitle}
                    onClick={() => setSelectedFilter(catTitle)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all whitespace-nowrap ${
                      selectedFilter === catTitle
                        ? "bg-orange-50 border-orange-500 text-orange-600 font-semibold"
                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {catTitle}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex items-center gap-3 flex-nowrap flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 text-sm rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="relative flex-shrink-0">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                  />
                </div>
              </div>
            </div>
          </section>

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
                    dispatch(FetchCategory());
                    dispatch(FetchService());
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
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredItems.map((item, index) => (
                    item.type === 'category' ? (
                      <CategoryCard key={`cat-${(item.data as CategoryDataType)._id || index}`} category={item.data as CategoryDataType} />
                    ) : (
                      <ServiceCard key={`service-${(item.data as ServiceDataType)._id || index}`} service={item.data as ServiceDataType} />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No services found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedFilter("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* CTA Banner */}
          <section className="mt-12 bg-gray-900 text-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Not sure which service you need?</h3>
              <p className="text-sm md:text-base text-gray-300">Get expert guidance and find the right solution for your business.</p>
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
