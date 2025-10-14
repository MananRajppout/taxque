"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";


const pvtOverver = "/assests/images/pvtOverver.svg";
const greenTik2 = "/assests/images/greenTikV2.svg";
const star = "/assests/images/star.png";
const homeBg = "/assests/images/homeBg.svg";
const appBg = "/assests/images/appBG.svg";
const whatsappIcon = "/assests/images/whatsappIcon.svg";
const viewIcon = "/assests/images/viewIcon.png";
const InternalServerErrImg = "/assests/images/intenalServerErr.jpg";
const plassIcon = "/assests/images/plassIcon.svg";
const mainasIcon = "/assests/images/mainasIcon.svg";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import ContactSection from "@/components/ContactSection";
import { AppHoloBtn } from "@/components/Button";
import PriceSection from "@/components/PriceSection";


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchServiceById } from "@/store/slices/serviceSlice";

export default function ServiceDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const { Service, status } = useSelector((state: RootState) => state.service);
  const Category = useSelector((state: RootState) => state.category);
  const [currentNav, setCurrentNav] = React.useState("Services");

  const [activeSection, setActiveSection] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState<number>(999999);
  const [navItems, setNavItems] = useState<string[]>([]);

  const handlePDClick = (props: string) => {
    setLoading(false);
    const section = document.getElementById(props);
    if (section) {
      const offset = 100;
      const topPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
    setActiveSection(props);
  };

  const openWhatsapp = () => {
    const url = `https://wa.me/9091385148`;
    window.open(url, "_blank");
  };

  const handleQuestionIndex = (i: number) => {
    if (i === questionIndex) {
      setQuestionIndex(999999);
    } else {
      setQuestionIndex(i);
    }
  };

  const sectionConfig: { key: string; label: string }[] = [
    { key: "overView", label: "Overview" },
    { key: "whatIs", label: "What is" },
    { key: "keyFeature", label: "Key Features" },
    { key: "benefits", label: "Benefits" },
    { key: "difference", label: "Difference" },
    { key: "documentsRequired", label: "Documents Required" },
    { key: "MCACompliance", label: "MCA Compliance" },
    { key: "Eligibility", label: "Eligibility" },
    { key: "DueDate", label: "Due Date" },
    { key: "Steps", label: "Steps" },
    { key: "ThresholdLimits", label: "Threshold Limits" },
    { key: "FAQ", label: "FAQ" },
  ];

  useEffect(() => {
    if (!Service) return;

    const newNavItems = sectionConfig
      .filter(({ key }) => {
        const value = (Service as Record<string, any>)[key];
        if (!value) return false;

        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "object") {
          return Object.values(value).some((v) => {
            if (Array.isArray(v)) return v.length > 0;
            if (typeof v === "string") return v.trim().length > 0;
            if (typeof v === "object" && v !== null)
              return Object.keys(v).length > 0;
            return false;
          });
        }
        if (typeof value === "string") return value.trim().length > 0;

        return false;
      })
      .map(({ label }) => label);

    setNavItems(newNavItems);
  }, [Service]);

  useEffect(() => {
    if (!id) return;
    dispatch(FetchServiceById({ slug: id }));
  }, [id, dispatch]);

  // Mock service data 
  const mockService = {
    _id: "mock-service-id",
    title: "Private Limited Company",
    displayName: "Private Limited Company",
    metaTitle: "Private Limited Company Registration",
    metaDescription: "Complete guide to Private Limited Company registration",
    priceData: [
      {
        _id: "price-1",
        planName: "Basic Plan",
        price: "₹4,999",
        features: ["Company Registration", "PAN & TAN", "Basic Support"],
        isPopular: false
      },
      {
        _id: "price-2", 
        planName: "Premium Plan",
        price: "₹7,999",
        features: ["Company Registration", "PAN & TAN", "GST Registration", "Priority Support"],
        isPopular: true
      }
    ],
    feturePoints: [
      { title: "Quick Registration", summary: "Fast and efficient registration process" },
      { title: "Legal Compliance", summary: "Full compliance with Companies Act 2013" },
      { title: "Digital Process", summary: "100% online registration process" }
    ],
    overView: {
      title: "Private Limited Company Overview",
      summarys: [
        "A Private Limited Company is one of the most popular business structures in India.",
        "It offers limited liability protection to its shareholders.",
        "The company can have a minimum of 2 and maximum of 200 shareholders."
      ]
    },
    whatIs: {
      summarys: [
        "A Private Limited Company is a type of business entity that is privately held for small businesses.",
        "It is governed by the Companies Act, 2013 and regulated by the Ministry of Corporate Affairs (MCA)."
      ],
      liList: [
        { title: "Limited Liability", summary: "Shareholders' liability is limited to their shareholding" },
        { title: "Separate Legal Entity", summary: "Company has its own legal identity separate from its members" },
        { title: "Perpetual Succession", summary: "Company continues to exist even if members change" }
      ],
      Notice: {
        noticeTitle: "Important Notice",
        noticeSummary: "All companies must comply with MCA regulations and file annual returns."
      }
    },
    keyFeature: {
      title: "Key Features of",
      summarys: "Private Limited Company offers several advantages for business owners.",
      keyFeatureItems: [
        { title: "Limited Liability", summary: "Protects personal assets of shareholders" },
        { title: "Easy Fundraising", summary: "Can raise funds through equity and debt" },
        { title: "Tax Benefits", summary: "Various tax deductions and benefits available" }
      ]
    },
    benefits: {
      summarys: [
        "Private Limited Company structure offers numerous benefits for business growth and development."
      ],
      benefitsItems: [
        { title: "Credibility", summary: "Enhances business credibility and trust", icon: "🏢" },
        { title: "Growth", summary: "Easy to scale and expand business operations", icon: "📈" },
        { title: "Investment", summary: "Attracts investors and funding opportunities", icon: "💰" }
      ]
    },
    FAQ: [
      {
        question: "What is the minimum capital required for Private Limited Company?",
        answer: "There is no minimum capital requirement for Private Limited Company registration."
      },
      {
        question: "How long does it take to register a Private Limited Company?",
        answer: "The registration process typically takes 7-15 working days."
      }
    ]
  };

  const serviceData = Service || mockService;

  return (
    <div className="w-full min-h-screen bg-white text-black">
     
      <div className="w-full min-h-screen bg-gradient-to-br from-green-100/22 via-yellow-100/25 to-transparent relative">
     
        <Image src={appBg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="App Background" fill />
        <Image src={homeBg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Home Background" fill />
        
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {status === "error" ? (
          <div className="flex justify-center items-start pt-24">
            <Image src={InternalServerErrImg} alt="Error" width={400} height={300} className="rounded-2xl" />
          </div>
        ) : (
          <div className="w-full px-4 md:px-8 lg:px-16 py-16 pt-24">
            <div className="w-full max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
                <div className="w-full lg:w-2/3">
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                      {serviceData?.title}
                    </h1>
                    
                   
                    <div className="space-y-4 mb-8">
                      {serviceData?.feturePoints?.map((fe: any, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <Image src={greenTik2} alt="Check" width={20} height={20} className="mt-1" />
                          <p className="text-gray-700">
                            <span className="font-semibold">{fe.title}: </span>
                            {fe.summary}
                          </p>
                        </div>
                      ))}
                    </div>

                  
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                      <AppHoloBtn
                        btnText="Chat With Us"
                        width="200px"
                        height="40px"
                        icon={whatsappIcon}
                        onClick={openWhatsapp}
                      />

                      <div className="flex items-center gap-2">
                        <p className="text-gray-600">Review:</p>
                        <p className="text-lg font-semibold text-gray-900">4.8</p>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <Image key={i} src={star} alt="Star" width={16} height={16} />
                          ))}
                        </div>
                      </div>

                      <button
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                        onClick={() => handlePDClick("priceBox")}
                      >
                        <Image src={viewIcon} alt="View" width={24} height={24} />
                        View Package
                      </button>
                    </div>
                  </div>
                </div>

              
                <div className="w-full lg:w-1/3">
                  <ContactSection
                    subjectList={Category?.data}
                    section="Service"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <PriceSection product={serviceData as any} />
      </div>

     
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          
          <div className="w-full mb-8">
            <div className="w-full bg-gradient-to-r from-green-200 to-yellow-200 border border-gray-300 rounded-xl p-4 shadow-lg">
              <div className="flex flex-wrap justify-center gap-2">
                {navItems?.map((el, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      activeSection === el.toUpperCase().replace(/\s+/g, "")
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      handlePDClick(el.toUpperCase().replace(/\s+/g, ""))
                    }
                  >
                    {el === "What is"
                      ? `What is ${serviceData?.displayName || serviceData?.title}`
                      : el}
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          {navItems.includes("Overview") && (
            <div id="OVERVIEW" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {serviceData?.overView?.title}
              </h2>
              {serviceData?.overView?.summarys?.map((el: string, i: number) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {el}
                </p>
              ))}
            </div>
          )}

          
          {navItems.includes("What is") && (
            <div id="WHATIS" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What Is a <span className="text-orange-500">{serviceData?.title}</span>
              </h2>

              {serviceData?.whatIs?.summarys?.map((sm: string, i: number) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {sm}
                </p>
              ))}

              <div className="flex flex-col lg:flex-row gap-8 my-8">
                <Image src={pvtOverver} alt="Overview" className="w-full lg:w-1/3 h-auto rounded-lg" />
                <div className="w-full lg:w-2/3">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Definition as per the Companies Act, 2013
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Section 2(68) of the <strong>Companies Act, 2013,</strong> defines a
                    Private Limited Company as an entity that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {serviceData?.whatIs?.liList?.map((liVal: any, i: number) => (
                      <li key={i}>
                        <strong>{liVal.title}:</strong> {liVal.summary}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-yellow-100 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {serviceData?.whatIs?.Notice?.noticeTitle}
                </h3>
                <p className="text-gray-700">
                  {serviceData?.whatIs?.Notice?.noticeSummary}
                </p>
              </div>
            </div>
          )}

          
          {navItems.includes("Key Features") && (
            <div id="KEYFEATURES" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {serviceData?.keyFeature?.title} <span className="text-orange-500">Private Limited Company?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {serviceData?.keyFeature?.summarys}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData?.keyFeature?.keyFeatureItems?.map((el: any, i: number) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{el.title}</h3>
                    <p className="text-gray-600">{el.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {navItems.includes("Benefits") && (
            <div id="BENEFITS" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-orange-500">Benefits</span> of a {serviceData?.title}
              </h2>
              {serviceData?.benefits?.summarys?.map((sm: string, i: number) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-6">
                  {sm}
                </p>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData?.benefits?.benefitsItems?.map((el: any, i: number) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl p-6 shadow-lg">
                    <div className="text-3xl mb-4">{el.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{el.title}</h3>
                    <p className="text-gray-600">{el.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {navItems.includes("FAQ") && (
            <div id="FAQ" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {serviceData?.FAQ?.map((el: any, i: number) => (
                  <div
                    key={i}
                    className={`bg-white border border-gray-200 rounded-xl p-6 shadow-lg transition-all duration-300 ${
                      questionIndex === i ? "border-orange-500" : ""
                    }`}
                  >
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => handleQuestionIndex(i)}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {el?.question}
                      </h3>
                      <Image
                        src={questionIndex === i ? mainasIcon : plassIcon}
                        alt="Toggle"
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                    </button>
                    {questionIndex === i && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-gray-600 leading-relaxed">
                          {parse(el?.answer)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

        
      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}

