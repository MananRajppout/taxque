"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const pageBg = "/assests/images/otherPageBg.svg";
const MobileImg = "/assests/images/MobileImg.png";
const subBg = "/assests/images/subBg.svg";
const rightArrow = "/assests/images/rightArrow.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
const ServiceCard = ({ title, description, price, imageUrl }: { title: string; description: string; price: string; imageUrl?: string }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (title === "Income Tax Filing") {
      router.push('/services/itr-filing');
    } else {
      router.push('/contact-us');
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
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        </div>
        
     
        <div className="mb-4">
          <span className="text-lg font-bold text-orange-500">{price}</span>
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


import { useSelector } from "react-redux";
import { RootState } from "@/store/slices/store";

export default function ServiceListPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [currentNav, setCurrentNav] = React.useState("Services");

  const { data } = useSelector((state: RootState) => state.service);
  const category = useSelector((state: RootState) => state.category);


  const mockCategory = {
    _id: "mock-category-id",
    title: "Tax Services",
    category: "Tax Services",
    Slug: slug || "tax-services",
    metaTitle: "Tax Services - Professional Tax Solutions",
    metaDescription: "Comprehensive tax services for individuals and businesses"
  };

  const currentCategory = category?.data?.find((val) => val?.Slug === slug) || mockCategory;

  let Product_list: any[] = [];

  if (data.length) {
    Product_list = data.filter(
      (pr) => pr?.category?.id === currentCategory?._id
    );
  } else {
  
    Product_list = [
      {
        _id: "product-1",
        title: "GST Registration",
        description: "Complete GST registration service",
        price: "₹2,999",
        category: { id: currentCategory._id },
        image: "/images/gst-service.jpg"
      },
      {
        _id: "product-2", 
        title: "Income Tax Filing",
        description: "Professional income tax filing service",
        price: "₹1,999",
        category: { id: currentCategory._id },
        image: "/images/income-tax.jpg"
      },
      {
        _id: "product-3",
        title: "Company Registration",
        description: "Private limited company registration",
        price: "₹4,999",
        category: { id: currentCategory._id },
        image: "/images/company-reg.jpg"
      }
    ];
  }

  return (
    <div className="w-full min-h-screen bg-white text-black">
      
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
       
        <Image src={pageBg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
      
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">{currentCategory?.category}</span>
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            Category Related Service
          </h1>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Product_list?.filter(
              (el): el is any => el !== undefined
            ).map((el, i) => (
              <ServiceCard key={i} {...el} />
            ))}
          </div>
        </div>
      </div>

    
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Success Stories & Reviews
          </h2>
        
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-gray-600">Google Reviews Widget Integration</p>
            <p className="text-sm text-gray-500 mt-2">This would display actual Google reviews</p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 overflow-hidden">
          
            <Image src={subBg} className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20" alt="Subscribe Background" />
            <Image src={MobileImg} className="absolute bottom-0 right-0 w-1/3 h-auto opacity-30" alt="Mobile" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                Subscribe to Our Newsletter and Reduce your tax liability up to 26%
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                We are India's most trusted tax filing platform. Our team goes
                through in-depth training to help you plan and minimize your tax
                liability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter Your Email..." 
                  className="flex-1 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <AppBtn
                  btnText="Subscribe"
                  icon={rightArrow}
                  width="166px"
                  height="52px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}