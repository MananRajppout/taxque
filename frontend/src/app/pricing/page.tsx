"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import { AppBtn } from "@/components/Button";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchCategory } from "@/store/slices/categorySlice";
import { FetchService } from "@/store/slices/serviceSlice";

export default function PricingPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentNav, setCurrentNav] = useState("Pricing");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: categories } = useSelector((state: RootState) => state.category);
  const { data: services } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(FetchCategory());
    dispatch(FetchService());
  }, [dispatch]);

  // Get all pricing plans from services
  const allPricingPlans = services.flatMap(service => 
    service?.priceData?.map(price => ({
      ...price,
      serviceName: service.title,
      serviceId: service._id,
      categoryId: service.category
    })) || []
  );

  // Filter by category if selected
  const filteredPlans = selectedCategory 
    ? allPricingPlans.filter(plan => plan.categoryId === selectedCategory)
    : allPricingPlans;

  const handleChoosePlan = (plan: any) => {
    localStorage.setItem('selectedService', JSON.stringify({
      title: plan.title || plan.serviceName,
      price: plan.price,
      basicPrice: plan.basicPrice || plan.price,
      period: plan.plan || "month",
      rating: 4.8,
      serviceId: plan.serviceId,
      priceId: plan._id || plan.priceId
    }));
    
    router.push('/payment');
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Choose the Right Plan
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing for all our services. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Services
            </button>
            {categories.map((category: any) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category._id
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {filteredPlans.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No pricing plans found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan: any, index: number) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-white to-gray-50 border-2 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    plan.MostPopular 
                      ? 'border-orange-500 ring-4 ring-orange-200' 
                      : 'border-gray-200'
                  }`}
                >
                  {plan.MostPopular && (
                    <div className="bg-orange-500 text-white text-center py-2 rounded-lg mb-4 font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{plan.serviceName}</p>
                    <p className="text-sm text-gray-600 mb-6">{plan.summary}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {plan.fetures?.slice(0, 5).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.basicPrice && plan.basicPrice !== plan.price && (
                      <p className="text-sm text-gray-500 line-through mb-1">₹{plan.basicPrice}</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-orange-600">₹{plan.price}</span>
                      <span className="text-gray-500">/{plan.plan || 'month'}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <AppBtn
                    btnText="Choose Plan"
                    onClick={() => handleChoosePlan(plan)}
                    width="100%"
                    height="50px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose TaxQue?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced tax professionals with 10+ years of experience</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Competitive prices with no hidden fees or charges</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Support</h3>
              <p className="text-gray-600">24/7 customer support to help you with any queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <Subscribe />

      {/* Footer */}
      <Footer />
    </div>
  );
}

