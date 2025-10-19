"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

// Service data for GST Notice
const gstNoticeServices = [
  {
    id: 1,
    title: "GST Notice Response",
    description: "Professional response to GST notices and compliance requirements",
    price: "₹2,500",
    rating: 4.8,
    reviews: 156,
    features: [
      "Notice analysis and assessment",
      "Document preparation",
      "Response filing",
      "Follow-up support"
    ]
  },
  {
    id: 2,
    title: "GST Assessment Notice",
    description: "Handle GST assessment notices and tax determination",
    price: "₹3,500",
    rating: 4.9,
    reviews: 89,
    features: [
      "Assessment review",
      "Tax calculation verification",
      "Response preparation",
      "Appeal filing if required"
    ]
  },
  {
    id: 3,
    title: "GST Demand Notice",
    description: "Respond to GST demand notices and payment requirements",
    price: "₹4,000",
    rating: 4.7,
    reviews: 124,
    features: [
      "Demand analysis",
      "Payment planning",
      "Response submission",
      "Settlement negotiation"
    ]
  },
  {
    id: 4,
    title: "GST Show Cause Notice",
    description: "Professional handling of GST show cause notices",
    price: "₹5,000",
    rating: 4.8,
    reviews: 98,
    features: [
      "Notice evaluation",
      "Evidence collection",
      "Response drafting",
      "Legal representation"
    ]
  },
  {
    id: 5,
    title: "GST Penalty Notice",
    description: "Handle GST penalty notices and reduce penalties",
    price: "₹3,000",
    rating: 4.6,
    reviews: 167,
    features: [
      "Penalty assessment",
      "Mitigation strategies",
      "Response filing",
      "Penalty reduction"
    ]
  },
  {
    id: 6,
    title: "GST Registration Cancellation Notice",
    description: "Respond to GST registration cancellation notices",
    price: "₹4,500",
    rating: 4.9,
    reviews: 76,
    features: [
      "Cancellation review",
      "Compliance verification",
      "Response preparation",
      "Registration restoration"
    ]
  }
];

const ServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();

  const handleChoosePlan = () => {
    router.push('/contact-us');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image
              src="/assests/images/ITNIcon.svg"
              alt="GST Notice Icon"
              width={28}
              height={28}
              className="w-7 h-7"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{service.description}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({service.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Features:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {service.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{service.price}</span>
            <span className="text-sm text-gray-600 ml-1">per notice</span>
          </div>
          <button
            onClick={handleChoosePlan}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GSTNoticePage() {
  const router = useRouter();
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
            <span className="hover:text-orange-600 cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">&gt;</span>
            <span className="hover:text-orange-600 cursor-pointer" onClick={() => router.push('/our-services')}>Services</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">GST Notice</span>
          </nav>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              GST Notice Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional handling of all GST notices and compliance requirements. 
              Our experts help you respond effectively to various GST notices.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {gstNoticeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Success Stories & Reviews Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Why Choose Our GST Notice Services?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">Certified GST professionals with years of experience</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-600">Fast and accurate notice responses within deadlines</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Effective</h3>
                <p className="text-gray-600">Competitive pricing with transparent fee structure</p>
              </div>
            </div>
          </div>
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
