"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (public paths)
const pageBg = "/assests/images/otherPageBg.svg";
const iconBox = "/assests/images/iconBox.svg";
const MenuIcon = "/assests/images/menuIconV2.png";
const backRoundArrow = "/assests/images/backRoundArrow.png";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

// Data
const servicesData = [
  {
    title: "Income Tax",
    icon: "https://img.icons8.com/ios-filled/50/income-tax.png"
  },
  {
    title: "GST",
    icon: "https://img.icons8.com/ios-filled/50/gst.png"
  },
  {
    title: "Business Registration",
    icon: "https://img.icons8.com/ios-filled/50/business.png"
  },
  {
    title: "Compliance",
    icon: "https://img.icons8.com/ios-filled/50/compliance.png"
  },
  {
    title: "Accounting",
    icon: "https://img.icons8.com/ios-filled/50/accounting.png"
  },
  {
    title: "Trademark",
    icon: "https://img.icons8.com/ios-filled/50/trademark.png"
  }
];

export default function FAQPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = React.useState("FAQ");
  const [faqSideNav, setFaqSideNav] = useState(false);
  const [faqNav, setFaqNav] = useState("General Questions");

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Image src={pageBg} className="w-full h-full object-cover" alt="Page Background" fill priority />
        </div>
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">FAQ</span>
          </p>
        </div>

        {/* Main Heading */}
        <div className="flex-1 flex items-center justify-center pb-10 md:pb-16 lg:pb-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Frequently Asked Tax Questions
          </h1>
        </div>
      </div>

      {/* Main FAQ Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-row gap-4 md:gap-8 relative">
            {/* FAQ Navigation Sidebar */}
            <div
              className={`${
                faqSideNav 
                  ? "w-3/5 md:w-1/3 lg:w-1/4 p-4 md:p-6" 
                  : "w-0 overflow-hidden"
              } absolute md:relative left-0 top-0 z-20 bg-white shadow-lg rounded-lg transition-all duration-600 ease-in-out ${
                faqSideNav ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* General Questions Tab */}
                <div
                  onClick={() => {
                    setFaqNav("General Questions");
                    setFaqSideNav(false);
                  }}
                  className={`w-full min-h-12 md:min-h-14 lg:min-h-16 flex items-center gap-3 px-3 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 ${
                    faqNav === "General Questions"
                      ? "bg-green-100 border-green-300"
                      : "hover:bg-green-50"
                  }`}
                >
                  <div className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12 relative flex items-center justify-center">
                    <Image
                      width={20}
                      height={20}
                      src="https://img.icons8.com/ios-filled/50/q.png"
                      alt="Q"
                      className="w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6 absolute top-1 md:top-2 lg:top-3 z-10"
                    />
                    <Image src={iconBox} alt="" className="w-full h-full absolute" />
                  </div>
                  <p className="text-xs md:text-sm lg:text-base font-semibold text-gray-600">
                    General Questions
                  </p>
                </div>

                {/* Service Category Tabs */}
                {servicesData?.map((el, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setFaqNav(el.title);
                      setFaqSideNav(false);
                    }}
                    className={`w-full min-h-12 md:min-h-14 lg:min-h-16 flex items-center gap-3 px-3 rounded-lg border border-gray-200 cursor-pointer transition-all duration-300 ${
                      faqNav === el.title
                        ? "bg-green-100 border-green-300"
                        : "hover:bg-green-50"
                    }`}
                  >
                    <Image 
                      className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12" 
                      src={el.icon} 
                      alt={el.title} 
                      width={48}
                      height={48}
                    />
                    <p className="text-xs md:text-sm lg:text-base font-semibold text-gray-600">
                      {el.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Content Section */}
            <div className="w-full md:w-2/3 lg:w-3/4 bg-white shadow-lg rounded-lg relative min-h-[500px] p-4 md:p-6">
              {/* Mobile Menu Toggle */}
              <Image
                src={faqSideNav ? backRoundArrow : MenuIcon}
                className="absolute top-2 right-3 w-6 h-6 cursor-pointer md:hidden"
                alt="Menu"
                width={24}
                height={24}
                onClick={() => setFaqSideNav(!faqSideNav)}
              />

              {/* FAQ Content */}
              <div className="w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
                  {faqNav}
                </h2>
                
                {/* FAQ Questions and Answers */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      What services does TaxQue provide?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      TaxQue provides comprehensive tax and accounting services including Income Tax filing, GST compliance, Business Registration, ROC Compliance, Accounting & Bookkeeping, and Trademark services.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      How can I get started with TaxQue?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      You can get started by contacting us at support@taxque.com or info@taxque.com. Our team will guide you through the process and help you choose the right services for your needs.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      What are your working hours?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Our team is available Monday to Friday from 9:00 AM to 6:00 PM. For urgent queries, you can reach us at +00 1234567890 or +00 9876543210.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      Do you provide online support?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Yes, we provide 24/7 online support through our website and email. You can also schedule online consultations with our tax experts.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      What documents do I need for tax filing?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      The required documents vary based on your income sources. Generally, you'll need PAN card, Aadhar card, Form 16, bank statements, and investment proofs. Our team will provide a detailed checklist based on your specific situation.
                    </p>
                  </div>

                  <div className="pb-4">
                    <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                      How much do your services cost?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Our pricing varies based on the services you need. We offer competitive rates and transparent pricing. Contact us for a personalized quote based on your requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}