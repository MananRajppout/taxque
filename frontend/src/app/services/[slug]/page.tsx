"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";

const smPageBG = "/assests/images/smPageBG.svg";
const appBG = "/assests/images/appBG.svg";
const homeBg = "/assests/images/homeBg.svg";
const GreenTik = "/assests/images/GreenTik.svg";
const greenTik2 = "/assests/images/greenTikV2.svg";
const ITNIcon = "/assests/images/ITNIcon.svg";
const star = "/assests/images/star.png";
const whatsappIcon = "/assests/images/whatsappIcon.svg";
const viewIcon = "/assests/images/viewIcon.png";
const pvtOverver = "/assests/images/pvtOverver.svg";
const plassIcon = "/assests/images/plassIcon.svg";
const mainasIcon = "/assests/images/mainasIcon.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import ContactSection from "@/components/ContactSection";
import { AppBtn, AppOrangeBtn, AppHoloBtn } from "@/components/Button";
import { ServiceCard, PriceCard, DropBox, FeaturesCard, BenefitsCard } from "@/components/Tools";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchServiceById } from "@/store/slices/serviceSlice";
import { FetchCategory } from "@/store/slices/categorySlice";

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();
  const { Service, status } = useSelector((state: RootState) => state.service);
  const categoryData = useSelector((state: RootState) => state.category);
  const [currentNav, setCurrentNav] = useState("Services");
  const [priceTab, setPriceTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(999999);
  const [navItems, setNavItems] = useState<string[]>([]);
  const hasFetchedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    if (status === "loading" && hasFetchedRef.current === slug) {
      return;
    }
    
    if (Service?.Slug === slug && status !== "error") {
      hasFetchedRef.current = slug;
      return;
    }
    
    hasFetchedRef.current = slug;
    
    if (Service?.Slug !== slug) {
      dispatch(FetchServiceById({ slug }));
    }
    
    if (!categoryData?.data?.length && categoryData?.status !== "loading") {
      dispatch(FetchCategory());
    }
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [slug]);

  // Section configuration
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

  // Update nav items based on available service data
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

  // Intersection Observer for active section highlighting
  useEffect(() => {
    if (!navItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.toUpperCase().replace(/\s+/g, ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems, Service]);

  const handleSectionClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const topPosition =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
    setActiveSection(sectionId);
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

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading
  if (status === "loading" || (!Service && status !== "error")) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (status === "error" || !Service) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Service not found</p>
          <AppBtn btnText="Go to Services" onClick={() => router.push("/our-services")} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-green-100/30 to-yellow-50 relative">
        <Image src={appBG} alt="" fill className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
        <Image src={homeBg} alt="" fill className="absolute top-0 left-0 w-full h-full object-cover -z-10" />
        
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        <div className="w-full px-4 md:px-8 lg:px-16 pt-32 md:pt-40 lg:pt-48 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Side - Service Info */}
              <div className="w-full lg:w-2/3">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    {Service.title}
                  </h1>
                  
                  {/* Feature Points */}
                  {Service.feturePoints && Service.feturePoints.length > 0 && (
                    <div className="space-y-4 mb-8">
                      {Service.feturePoints.map((fe, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Image src={greenTik2} alt="" width={20} height={20} className="mt-1 flex-shrink-0" />
                          <p className="text-sm md:text-base text-gray-700">
                            <span className="font-semibold">{fe.title}: </span>
                            {fe.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <AppHoloBtn
                      btnText="Chat With Us"
                      width="200px"
                      height="40px"
                      icon={whatsappIcon}
                      onClick={openWhatsapp}
                    />

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">Review: </p>
                      <p className="text-sm font-semibold text-gray-900">4.8</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <Image key={i} src={star} alt="Star" width={16} height={16} />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSectionClick("PRICEBOX")}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500 transition-colors underline"
                    >
                      <Image src={viewIcon} alt="" width={20} height={20} />
                      View Package
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="w-full lg:w-1/3">
                <ContactSection
                  subjectList={categoryData.data}
                  section="Service"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Section */}
          {Service.priceData && Service.priceData.length > 0 && (
            <div id="PRICEBOX" className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Right Plan For Your {Service.displayName || Service.title}
              </h2>
              
              {/* Price Tabs */}
              {!isMobile && (
                <div className="flex justify-center gap-4 mb-8">
                  {Service.priceData.map((price, i) => (
                    <button
                      key={i}
                      onClick={() => setPriceTab(i)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        priceTab === i
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {price.title}
                    </button>
                  ))}
                </div>
              )}

              {isMobile && (
                <div className="mb-6">
                  <DropBox
                    setDropVal={(val) => setPriceTab(parseInt(val))}
                    list={Service.priceData.map((_, i) => i)}
                    defaultVal={`Select Plan ${priceTab + 1}`}
                    width="100%"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Service.priceData.map((price, i) => {
                  const plan = (price as any).plan || (price as any).period || "Month";
                  return (
                    <PriceCard
                      key={i}
                      title={price.title}
                      basicPrice={price.basicPrice}
                      price={price.price}
                      plan={plan}
                      summary={price.summary}
                      fetures={price.fetures || []}
                      MostPopular={price.MostPopular || false}
                      priceTabe={priceTab}
                      index={i}
                      isMobile={isMobile}
                      productName={Service.title}
                      id={Service._id || ""}
                      priceId={price._id || ""}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Sidebar */}
          {navItems.length > 0 && (
            <div className="sticky top-4 z-10 mb-8 bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {navItems.map((el, i) => (
                  <button
                    key={i}
                    onClick={() => handleSectionClick(el.toUpperCase().replace(/\s+/g, ""))}
                    className={`px-3 py-2 text-sm md:text-base rounded-md transition-colors ${
                      activeSection === el.toUpperCase().replace(/\s+/g, "")
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {el === "What is"
                      ? `What is ${Service?.displayName || Service?.title}`
                      : el}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Overview */}
            {navItems.includes("Overview") && Service.overView && (
              <div id="OVERVIEW" className="space-y-4">
                {Service.overView.title && (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {Service.overView.title}
                  </h2>
                )}
                {Service.overView.summarys && Service.overView.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.overView.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* What Is */}
            {navItems.includes("What is") && Service.whatIs && (
              <div id="WHATIS" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  What Is a <span className="text-orange-500">{Service.title}</span>
                </h2>

                {Service.whatIs.summarys && Service.whatIs.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.whatIs.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}

                {Service.whatIs.liList && Service.whatIs.liList.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-8 mt-8">
                    <div className="w-full md:w-2/5">
                      <Image src={pvtOverver} alt="" width={400} height={300} className="w-full" />
                    </div>
                    <div className="w-full md:w-3/5">
                      <p className="text-base md:text-lg text-gray-600 mb-4">
                        Definition as per the Companies Act, 2013
                      </p>
                      <p className="text-base md:text-lg text-gray-600 mb-4">
                        Section 2(68) of the <b>Companies Act, 2013,</b> defines a
                        Private Limited Company as an entity that:
                      </p>
                      <ul className="space-y-3">
                        {Service.whatIs.liList.map((liVal, i) => (
                          <li key={i} className="text-base md:text-lg text-gray-600">
                            <b>{liVal.title}:</b> {liVal.summary}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {Service.whatIs.Notice && (
                  <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-l-4 border-green-400 p-6 rounded-lg mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {Service.whatIs.Notice.noticeTitle}
                    </h3>
                    <p className="text-base text-gray-700">
                      {Service.whatIs.Notice.noticeSummary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {navItems.includes("Key Features") && Service.keyFeature && (
              <div id="KEYFEATURES" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {Service.keyFeature.title} <span className="text-orange-500">Private Limited Company?</span>
                </h2>
                {Service.keyFeature.summarys && (
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {Service.keyFeature.summarys}
                  </p>
                )}
                {Service.keyFeature.keyFeatureItems && Service.keyFeature.keyFeatureItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {Service.keyFeature.keyFeatureItems.map((el, i) => (
                      <FeaturesCard
                        key={i}
                        title={el.title}
                        summary={el.summary}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Benefits */}
            {navItems.includes("Benefits") && Service.benefits && (
              <div id="BENEFITS" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Benefits</span> of a {Service.title}
                </h2>
                {Service.benefits.summarys && Service.benefits.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.benefits.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.benefits.benefitsItems && Service.benefits.benefitsItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {Service.benefits.benefitsItems.map((el, i) => (
                      <BenefitsCard
                        key={i}
                        title={el.title}
                        summary={el.summary}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Difference */}
            {navItems.includes("Difference") && Service.difference && (
              <div id="DIFFERENCE" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Difference</span> Between {Service.title} and Other Business Structures
                </h2>
                {Service.difference.summarys && Service.difference.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.difference.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.difference?.tableData && (
                  <div className="overflow-x-auto mt-6">
                    <div className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <div className="bg-gradient-to-r from-green-50 to-yellow-50 flex">
                        {Service.difference?.tableData?.headers.map((header, i) => (
                          <div key={i} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                            <p className="font-semibold text-gray-900">{header}</p>
                          </div>
                        ))}
                      </div>
                      {Service.difference?.tableData?.rows.map((row, i) => (
                        <div key={i} className="flex border-b border-gray-200 last:border-b-0">
                          {Service.difference?.tableData?.headers.map((header, j) => (
                            <div key={j} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                              <p className="text-sm text-gray-600">{row[header]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Documents Required */}
            {navItems.includes("Documents Required") && Service.documentsRequired && (
              <div id="DOCUMENTSREQUIRED" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">What Are the Documents Required for</span> {Service.title}
                </h2>
                {Service.documentsRequired.summarys && Service.documentsRequired.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.documentsRequired.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.documentsRequired?.tableData && (
                  <div className="overflow-x-auto mt-6">
                    <div className={`min-w-full bg-white border border-gray-200 rounded-lg ${
                      (Service.documentsRequired?.tableData?.headers?.length ?? 0) > 1 ? 'w-full' : 'w-1/2'
                    }`}>
                      <div className="bg-gradient-to-r from-green-50 to-yellow-50 flex">
                        {Service.documentsRequired?.tableData?.headers.map((header, i) => (
                          <div key={i} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                            <p className="font-semibold text-gray-900">{header}</p>
                          </div>
                        ))}
                      </div>
                      {Service.documentsRequired?.tableData?.rows.map((row, i) => (
                        <div key={i} className="flex border-b border-gray-200 last:border-b-0">
                          {Service.documentsRequired?.tableData?.headers.map((header, j) => (
                            <div key={j} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                              <p className="text-sm text-gray-600">{row[header]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MCA Compliance */}
            {navItems.includes("MCA Compliance") && Service.MCACompliance && (
              <div id="MCACOMPLIANCE" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Mandatory MCA Compliance for</span> {Service.title}
                </h2>
                {Service.MCACompliance.summarys && Service.MCACompliance.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.MCACompliance.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.MCACompliance?.tableData && (
                  <div className="overflow-x-auto mt-6">
                    <div className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <div className="bg-gradient-to-r from-green-50 to-yellow-50 flex">
                        {Service.MCACompliance?.tableData?.headers.map((header, i) => (
                          <div key={i} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                            <p className="font-semibold text-gray-900">{header}</p>
                          </div>
                        ))}
                      </div>
                      {Service.MCACompliance?.tableData?.rows.map((row, i) => (
                        <div key={i} className="flex border-b border-gray-200 last:border-b-0">
                          {Service.MCACompliance?.tableData?.headers.map((header, j) => (
                            <div key={j} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                              <p className="text-sm text-gray-600">{row[header]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Eligibility */}
            {navItems.includes("Eligibility") && Service.Eligibility && (
              <div id="ELIGIBILITY" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {Service.Eligibility.title}
                </h2>
                {Service.Eligibility.summarys && Service.Eligibility.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.Eligibility.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.Eligibility.eligibilityPoints && Service.Eligibility.eligibilityPoints.length > 0 && (
                  <div className="space-y-4 mt-6">
                    {Service.Eligibility.eligibilityPoints.map((point, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{point.title}</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {point.bulletPoints.map((bp, j) => (
                            <li key={j} className="text-sm text-gray-600">{bp.bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Due Date */}
            {navItems.includes("Due Date") && Service.DueDate && (
              <div id="DUEDATE" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Due Date for</span> {Service.displayName}
                </h2>
                {Service.DueDate.summarys && Service.DueDate.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.DueDate.summarys.map((summary, i) => (
                      <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(summary)}
                      </p>
                    ))}
                  </div>
                )}
                {Service.DueDate?.tableData && (
                  <div className="overflow-x-auto mt-6">
                    <div className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <div className="bg-gradient-to-r from-green-50 to-yellow-50 flex">
                        {Service.DueDate?.tableData?.headers.map((header, i) => (
                          <div key={i} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                            <p className="font-semibold text-gray-900">{header}</p>
                          </div>
                        ))}
                      </div>
                      {Service.DueDate?.tableData?.rows.map((row, i) => (
                        <div key={i} className="flex border-b border-gray-200 last:border-b-0">
                          {Service.DueDate?.tableData?.headers.map((header, j) => (
                            <div key={j} className="flex-1 px-4 py-3 border-r border-gray-200 last:border-r-0">
                              <p className="text-sm text-gray-600">{row[header]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Steps */}
            {navItems.includes("Steps") && Service.Steps && Service.Steps.length > 0 && (
              <div id="STEPS" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Steps</span>
                </h2>
                <div className="space-y-6">
                  {Service.Steps.map((stp, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{stp.title}</h3>
                      {stp.summary && stp.summary.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {stp.summary.map((stpSum, j) => (
                            <p key={j} className="text-base text-gray-600">
                              {stpSum.summary}
                            </p>
                          ))}
                        </div>
                      )}
                      {stp.steps && stp.steps.length > 0 && (
                        <ul className="list-decimal list-inside space-y-2 ml-4">
                          {stp.steps.map((sstp, k) => (
                            <li key={k} className="text-sm text-gray-600">
                              Step {k + 1}: {sstp.step}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Threshold Limits */}
            {navItems.includes("Threshold Limits") && Service.ThresholdLimits && (
              <div id="THRESHOLDLIMITS" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <span className="text-orange-500">Threshold Limits</span>
                </h2>
                {Service.ThresholdLimits.title && (
                  <h3 className="text-xl font-semibold text-gray-900">
                    {Service.ThresholdLimits.title}
                  </h3>
                )}
                {Service.ThresholdLimits.summarys && Service.ThresholdLimits.summarys.length > 0 && (
                  <div className="space-y-4">
                    {Service.ThresholdLimits.summarys.map((summary, j) => (
                      <p key={j} className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {summary}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* FAQ */}
            {navItems.includes("FAQ") && Service.FAQ && Service.FAQ.length > 0 && (
              <div id="FAQ" className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                {Service.FAQ.map((faq, i) => (
                  <div
                    key={i}
                    className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all ${
                      questionIndex === i ? "shadow-md" : ""
                    }`}
                  >
                    <button
                      onClick={() => handleQuestionIndex(i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</p>
                      <Image
                        src={questionIndex === i ? mainasIcon : plassIcon}
                        alt=""
                        width={24}
                        height={24}
                        className="flex-shrink-0"
                      />
                    </button>
                    {questionIndex === i && (
                      <div className="px-5 pb-5">
                        <p className="text-base text-gray-600 leading-relaxed">{parse(faq.answer)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}