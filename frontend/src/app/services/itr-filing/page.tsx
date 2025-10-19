"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

// Service data for ITR Filing
const itrServices = [
  {
    title: "ITR-1 Filing Online in India",
    basicPrice: "4599",
    price: "2999",
    period: "month",
    rating: 4.8,
    description: "Complete ITR-1 filing for salaried individuals with income up to ₹50 lakhs"
  },
  {
    title: "ITR-2 Filing Online in India", 
    basicPrice: "4599",
    price: "2999",
    period: "month",
    rating: 4.8,
    description: "ITR-2 filing for individuals with income from house property, capital gains, etc."
  },
  {
    title: "ITR-3 Filing Online in India",
    basicPrice: "4599", 
    price: "2999",
    period: "month",
    rating: 4.8,
    description: "ITR-3 filing for individuals with business or profession income"
  },
  {
    title: "ITR-4 Filing Online in India",
    basicPrice: "4599",
    price: "2999", 
    period: "month",
    rating: 4.8,
    description: "ITR-4 filing for presumptive taxation scheme"
  },
  {
    title: "ITR-5 Filing Online in India",
    basicPrice: "4599",
    price: "2999",
    period: "month", 
    rating: 4.8,
    description: "ITR-5 filing for partnership firms, LLPs, and other entities"
  },
  {
    title: "ITR-6 Filing Online in India",
    basicPrice: "4599",
    price: "2999",
    period: "month",
    rating: 4.8,
    description: "ITR-6 filing for companies (except those claiming exemption)"
  },
  {
    title: "ITR-7 Filing Online in India", 
    basicPrice: "4599",
    price: "2999",
    period: "month",
    rating: 4.8,
    description: "ITR-7 filing for trusts, political parties, and other entities"
  }
];

// Service Card Component (notice-style)
const ServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();

  const handleChoosePlan = () => {
    router.push('/payment');
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
            <Image src="/assests/images/ITNIcon.svg" alt="icon" width={28} height={28} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{service.title}</h3>
            <div className="text-sm text-gray-500 mt-2">Basic Price: <span className="line-through">₹{service.basicPrice}</span></div>
          </div>
        </div>

        {/* Rating block */}
        <div className="flex flex-col items-end">
          <span className="text-orange-500 font-semibold text-sm">{service.rating}</span>
          <div className="text-yellow-400 mt-1">★★★★★</div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Price:</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-orange-600">₹{service.price}</span>
            <span className="text-sm text-gray-500">/{service.period}</span>
          </div>
        </div>

        <div>
          <button onClick={handleChoosePlan} className="py-2 px-4 rounded-md border-2 border-orange-500 text-orange-500 bg-white hover:bg-orange-50 font-semibold transition-colors duration-200">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ITRFilingPage() {
  const [currentNav, setCurrentNav] = useState("Services");

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
            <span className="hover:text-orange-600 cursor-pointer">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">Income Tax Services</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
            Category Related Service
          </h1>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {itrServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories & Reviews Section */}
      <div className="bg-gray-50 py-16">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Success Stories & Reviews
            </h2>
            <div className="text-center text-gray-600">
              <p className="text-lg">Customer testimonials and success stories will be displayed here.</p>
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
