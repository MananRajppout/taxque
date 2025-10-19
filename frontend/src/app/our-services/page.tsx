"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/slices/store";

// Service data matching the images
const serviceData = [
  {
    category: "Income Tax Services",
    services: [
      {
        title: "ITR Filing",
        description: "Complete income tax return filing services for individuals and businesses",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Notice",
        description: "Handle income tax notices and compliance requirements",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "TDS Return Filling",
        description: "Tax Deducted at Source return filing and compliance",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  },
  {
    category: "Goods and Services Tax (GST)",
    services: [
      {
        title: "GST Annual Return",
        description: "Annual GST return filing and compliance services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "GST Registration",
        description: "New GST registration and modification services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Gst Return",
        description: "Monthly and quarterly GST return filing",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "LUT Filing",
        description: "Letter of Undertaking filing for export services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "GST Notice",
        description: "GST notice handling and compliance",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  },
  {
    category: "Startup Services",
    services: [
      {
        title: "Individual",
        description: "Individual startup registration and compliance services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Non-Individual",
        description: "Corporate startup registration and compliance services",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  },
  {
    category: "Compliance Services",
    services: [
      {
        title: "HR compliance",
        description: "Human resource compliance and documentation services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Individual and small business",
        description: "Compliance services for individual and small business entities",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Non-Individual and small business",
        description: "Compliance services for corporate and large business entities",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Other Compliance",
        description: "Other regulatory compliance and documentation services",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  },
  {
    category: "Intellectual Property Rights (IPR)",
    services: [
      {
        title: "Trademarks",
        description: "Trademark registration, protection, and renewal services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Copyright",
        description: "Copyright registration and protection services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Patent",
        description: "Patent filing, registration, and protection services",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  },
  {
    category: "Accounting",
    services: [
      {
        title: "Bookkeeping",
        description: "Professional bookkeeping and accounting services",
        icon: "/assests/images/ITNIcon.svg"
      },
      {
        title: "Report",
        description: "Financial reporting and analysis services",
        icon: "/assests/images/ITNIcon.svg"
      }
    ]
  }
];

const ServiceCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  const router = useRouter();
  
  const handleClick = () => {
    // Navigate to specific service page based on title
    switch (title) {
      case "ITR Filing":
        router.push('/services/itr-filing');
        break;
      case "Notice":
        router.push('/our-services/notice');
        break;
      case "GST Notice":
        router.push('/services/gst-notice');
        break;
      case "TDS Return Filling":
        router.push('/services/tds-return-filing');
        break;
      case "GST Annual Return":
        router.push('/services/gst-annual-return');
        break;
      case "GST Registration":
        router.push('/services/gst-registration');
        break;
      case "Gst Return":
        router.push('/services/gst-return');
        break;
      case "LUT Filing":
        router.push('/services/lut-filing');
        break;
      case "Individual":
        router.push('/services/individual-startup');
        break;
      case "Non-Individual":
        router.push('/services/non-individual-startup');
        break;
      case "HR compliance":
        router.push('/services/hr-compliance');
        break;
      case "Individual and small business":
        router.push('/services/individual-small-business');
        break;
      case "Non-Individual and small business":
        router.push('/services/non-individual-small-business');
        break;
      case "Other Compliance":
        router.push('/services/other-compliance');
        break;
      case "Trademarks":
        router.push('/services/trademarks');
        break;
      case "Copyright":
        router.push('/services/copyright');
        break;
      case "Patent":
        router.push('/services/patent');
        break;
      case "Bookkeeping":
        router.push('/services/bookkeeping');
        break;
      case "Report":
        router.push('/services/report');
        break;
      default:
        router.push('/contact-us');
        break;
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
              src={icon}
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
            <span className="text-gray-600">Services</span>
          </nav>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Our Comprehensive Services
          </h1>
        
          <div className="space-y-12 md:space-y-16">
            {serviceData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="w-full">
                {/* Section Title */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
                  {section.category}
                  </h2>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {section.services.map((service, serviceIndex) => (
                    <ServiceCard
                      key={serviceIndex}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
