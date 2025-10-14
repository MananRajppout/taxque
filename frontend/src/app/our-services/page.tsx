"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (public paths)
const pageBg = "/assests/images/otherPageBg.svg";
const MobileImg = "/assests/images/MobileImg.png";
const subBg = "/assests/images/subBg.svg";
const rightArrow = "/assests/images/rightArrow.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import { ServiceCard } from "@/components/Tools";
import SuccessStories from "@/components/SuccessStories";
import Subscribe from "@/components/Subscribe";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/slices/store";

// Data
const MainCategoryList = [
  {
    title: "Income Tax",
    description: "Complete income tax filing, planning, and compliance services for individuals, businesses, and professionals. Expert guidance to maximize deductions and minimize tax liability."
  },
  {
    title: "Goods and Service Tax",
    description: "Comprehensive GST registration, filing, compliance, and advisory services. Stay compliant with GST regulations and optimize your tax structure."
  },
  {
    title: "Business Registration",
    description: "Professional company incorporation, LLP registration, partnership firm setup, and business entity formation services across India."
  },
  {
    title: "Accounting & Bookkeeping",
    description: "Professional bookkeeping, financial reporting, accounting software setup, and financial analysis services for businesses of all sizes."
  },
  {
    title: "Trademark",
    description: "Trademark registration, protection, renewal, and intellectual property services to safeguard your brand and business identity."
  }
];

export default function CategoryPage() {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.category);
  const categorySection = useSelector((state: RootState) => state.homeCategorySection);
  const [currentNav, setCurrentNav] = React.useState("Services");

  const renderCategoryCard = (category: string) => {
    const filterData = data?.filter((val) => val.category === category);
    if (filterData.length > 0) {
      return (
        <>
          {filterData?.map((el, i) => (
            <ServiceCard {...el} key={i} />
          ))}
        </>
      );
    }
  };

  useEffect(() => {
    if (!categorySection.value) {
      return;
    }
    const section = document.getElementById(categorySection?.value);

    if (section) {
      const offset = 100;
      const topPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  }, [categorySection?.value]);

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <div className="bg-white">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        </div>

      <div className="px-4 md:px-8 lg:px-16 pt-20 pb-8 md:pb-12 lg:pb-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-left text-gray-900 mb-8">
            Our Comprehensive Services
          </h1>
        
        <div className="w-full max-w-7xl mx-auto">
          {/* Service Categories Overview */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Service Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MainCategoryList.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-orange-500 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              ))}
        </div>
      </div>

          {/* Category Sections */}
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {MainCategoryList?.map((val, i) => (
              <div
                key={i}
                className="w-full relative"
                style={{
                  display: renderCategoryCard(val.title) === undefined ? "none" : "block",
                }}
              >
                {/* Category Title */}
                <div className="w-full mb-6 md:mb-8">
                  <h2 
                    className="text-lg md:text-2xl lg:text-3xl font-bold text-orange-500 bg-blue-900 px-4 py-3 rounded-xl text-center md:text-left md:absolute md:-top-16 md:left-5 z-10"
                    id={val?.title?.replace(/\s+/g, "").toUpperCase()}
                  >
                    {val?.title}
                  </h2>
                </div>

                {/* Service Cards Grid */}
                <div className="w-full bg-gradient-to-r from-white via-green-50 to-white rounded-2xl p-4 md:p-6 lg:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {renderCategoryCard(val.title)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories & Reviews Section */}
      <SuccessStories />

      {/* Subscribe Section */}
      <Subscribe />

      <Footer />
    </div>
  );
}
