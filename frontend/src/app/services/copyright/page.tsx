"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";


const copyrightServices = [
  {
    title: "Copyright Registration",
    basicPrice: "4599",
    price: "2999",
    period: "one-time",
    rating: 4.8,
    description: "Complete copyright registration and filing services"
  },
  {
    title: "Copyright Search", 
    basicPrice: "4599",
    price: "2999",
    period: "search",
    rating: 4.8,
    description: "Comprehensive copyright search and verification services"
  },
  {
    title: "Copyright Renewal", 
    basicPrice: "4599", 
    price: "2999",
    period: "renewal",
    rating: 4.8,
    description: "Copyright renewal and maintenance services"
  },
  {
    title: "Copyright Assignment",
    basicPrice: "4599",
    price: "2999", 
    period: "one-time",
    rating: 4.8,
    description: "Copyright assignment and transfer services"
  },
  {
    title: "Copyright Licensing",
    basicPrice: "4599",
    price: "2999",
    period: "agreement", 
    rating: 4.8,
    description: "Copyright licensing agreement drafting and filing"
  },
  {
    title: "Copyright Infringement",
    basicPrice: "4599",
    price: "2999",
    period: "case",
    rating: 4.8,
    description: "Copyright infringement protection and legal action"
  },
  {
    title: "Copyright Portfolio Management",
    basicPrice: "4599",
    price: "2999",
    period: "year",
    rating: 4.8,
    description: "Complete copyright portfolio management services"
  },
  {
    title: "Copyright Advisory Services",
    basicPrice: "4599",
    price: "2999",
    period: "consultation",
    rating: 4.8,
    description: "Copyright advisory and consultation services"
  }
];

const ServiceCard = ({ service }: { service: any }) => {
  const router = useRouter();
  
  const handleChoosePlan = () => {
    localStorage.setItem('selectedService', JSON.stringify({
      title: service.title,
      price: service.price,
      basicPrice: service.basicPrice,
      period: service.period,
      rating: service.rating
    }));
    router.push('/payment');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1">
     
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image
              src="/assests/images/ITNIcon.svg"
              alt="Copyright Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
          </div>
        </div>
        
       
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Basic Price:</span>
              <span className="text-sm text-gray-400 line-through">₹{service.basicPrice}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
              <div className="flex items-center gap-0.5">
                {renderStars(service.rating)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Price: </span>
            <span className="text-xl font-bold text-orange-500">₹{service.price}</span>
            <span className="text-sm text-gray-600"> /{service.period}</span>
          </div>
        </div>
        
       
        <button
          onClick={handleChoosePlan}
          className="w-full bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};

export default function CopyrightPage() {
  const [currentNav, setCurrentNav] = useState("Services");

  return (
    <div className="w-full min-h-screen bg-white">
     
      <div className="bg-white shadow-sm">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

     
      <div className="px-4 md:px-8 lg:px-16 pt-20 pb-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-orange-500 mb-6">
            <span className="hover:text-orange-600 cursor-pointer">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">Intellectual Property Rights (IPR)</span>
          </nav>
        </div>
      </div>

     
      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
         
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12">
            Copyright Services
          </h1>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {copyrightServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>

     
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

     
      <Subscribe />

     
      <Footer />
    </div>
  );
}
