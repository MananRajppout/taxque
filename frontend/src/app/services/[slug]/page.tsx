"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";

const smPageBG = "/assests/images/smPageBG.svg";
const GreenTik = "/assests/images/GreenTik.svg";
const ITNIcon = "/assests/images/ITNIcon.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import ContactSection from "@/components/ContactSection";
import { AppBtn, AppOrangeBtn, AppHoloBtn } from "@/components/Button";
import { ServiceCard, PriceCard, DropBox } from "@/components/Tools";

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
  const hasFetchedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    // Skip if already loading this slug or if we already have the correct service
    if (status === "loading" && hasFetchedRef.current === slug) {
      return;
    }
    
    // Skip if we already have this service loaded (unless it's an error state)
    if (Service?.Slug === slug && status !== "error") {
      hasFetchedRef.current = slug;
      return;
    }
    
    // Mark that we're fetching this slug
    hasFetchedRef.current = slug;
    
    // Fetch the service
    if (Service?.Slug !== slug) {
      dispatch(FetchServiceById({ slug }));
    }
    
    // Fetch categories only once if not already loaded
    if (!categoryData?.data?.length && categoryData?.status !== "loading") {
      dispatch(FetchCategory());
    }
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]); // Only re-run when slug changes

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyClick = (priceId: string) => {
    if (!Service?._id) return;
    localStorage.setItem("planServiceId", Service._id);
    localStorage.setItem("planServiceName", Service.title);
    localStorage.setItem("planPriceId", priceId);
    router.push("/services/product-details/payment-checkout");
    goTop();
  };

  // Show loading when status is loading, or when we don't have service data yet (initial load)
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

  if (status === "error") {
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
    <div className="w-full min-h-screen bg-white text-black">
      {/* Header with Breadcrumb */}
      <div className="w-full h-[120px] flex flex-col relative bg-transparent text-black md:h-[160px] lg:h-[180px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        <div className="w-full flex items-center justify-start px-4 md:px-8 lg:px-16 mt-2">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span 
              onClick={() => router.push("/our-services")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Services
            </span>
            {Service?.category && (
              <>
                <span className="mx-2">&gt;</span>
                <span 
                  onClick={() => router.push("/our-services")} 
                  className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
                >
                  {Service.category.title}
                </span>
              </>
            )}
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">{Service.title}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Side */}
            <div className="w-full lg:w-2/3">
              {/* Service Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {Service.title}
              </h1>
              
              {Service.displayName && (
                <p className="text-lg md:text-xl text-gray-600 mb-8">{Service.displayName}</p>
              )}

              {/* Feature Points */}
              {Service.feturePoints && Service.feturePoints.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 mb-8 border border-green-200">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Service.feturePoints.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Image src={GreenTik} alt="Feature" width={20} height={20} className="mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              {Service.overView && (
                <div className="mb-8">
                  {Service.overView.title && (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
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

              {/* What Is Section */}
              {Service.whatIs && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is {Service.title}?</h2>
                  {Service.whatIs.summarys && Service.whatIs.summarys.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {Service.whatIs.summarys.map((summary, i) => (
                        <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                          {parse(summary)}
                        </p>
                      ))}
                    </div>
                  )}
                  {Service.whatIs.liList && Service.whatIs.liList.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {Service.whatIs.liList.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Image src={GreenTik} alt="Check" width={20} height={20} className="mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.summary}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {Service.whatIs.Notice && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{Service.whatIs.Notice.noticeTitle}</h3>
                      <p className="text-sm text-gray-700">{Service.whatIs.Notice.noticeSummary}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {Service.keyFeature && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {Service.keyFeature.title}
                  </h2>
                  {Service.keyFeature.summarys && Service.keyFeature.summarys.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {Service.keyFeature.summarys.map((summary, i) => (
                        <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                          {parse(summary)}
                        </p>
                      ))}
                    </div>
                  )}
                  {Service.keyFeature.keyFeatureItems && Service.keyFeature.keyFeatureItems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Service.keyFeature.keyFeatureItems.map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              {Service.benefits && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {Service.benefits.title}
                  </h2>
                  {Service.benefits.summarys && Service.benefits.summarys.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {Service.benefits.summarys.map((summary, i) => (
                        <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                          {parse(summary)}
                        </p>
                      ))}
                    </div>
                  )}
                  {Service.benefits.benefitsItems && Service.benefits.benefitsItems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Service.benefits.benefitsItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Image src={GreenTik} alt="Benefit" width={20} height={20} className="mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.summary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Eligibility */}
              {Service.Eligibility && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {Service.Eligibility.title}
                  </h2>
                  {Service.Eligibility.summarys && Service.Eligibility.summarys.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {Service.Eligibility.summarys.map((summary, i) => (
                        <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                          {parse(summary)}
                        </p>
                      ))}
                    </div>
                  )}
                  {Service.Eligibility.eligibilityPoints && Service.Eligibility.eligibilityPoints.length > 0 && (
                    <div className="space-y-4">
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

              {/* Documents Required */}
              {Service.documentsRequired && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {Service.documentsRequired.title}
                  </h2>
                  {Service.documentsRequired.summarys && Service.documentsRequired.summarys.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {Service.documentsRequired.summarys.map((summary, i) => (
                        <p key={i} className="text-base md:text-lg text-gray-600 leading-relaxed">
                          {parse(summary)}
                        </p>
                      ))}
                    </div>
                  )}
                  {Service.documentsRequired.tableData && (
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            {Service.documentsRequired.tableData.headers.map((header, i) => (
                              <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Service.documentsRequired.tableData.rows.map((row, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              {Service.documentsRequired.tableData.headers.map((header, j) => (
                                <td key={j} className="px-4 py-3 text-sm text-gray-600">
                                  {row[header]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Steps */}
              {Service.Steps && Service.Steps.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Process & Steps</h2>
                  <div className="space-y-6">
                    {Service.Steps.map((step, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                            {step.summary && step.summary.length > 0 && (
                              <div className="space-y-2 mb-4">
                                {step.summary.map((s, j) => (
                                  <p key={j} className="text-base text-gray-600 leading-relaxed">
                                    {parse(s.summary)}
                                  </p>
                                ))}
                              </div>
                            )}
                            {step.steps && step.steps.length > 0 && (
                              <ul className="list-disc list-inside space-y-2">
                                {step.steps.map((s, j) => (
                                  <li key={j} className="text-sm text-gray-600">{s.step}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {Service.FAQ && Service.FAQ.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {Service.FAQ.map((faq, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-base text-gray-600 leading-relaxed">{parse(faq.answer)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="w-full lg:w-1/3">
              <div className="mb-8">
                <ContactSection subjectList={categoryData.data} section="Service" />
              </div>
              {categoryData?.data?.length && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">Our Services</h3>
                  <div className="space-y-4 mb-6">
                    {categoryData?.data?.slice(0, 2).map((el, i) => (
                      <ServiceCard {...el} key={i} />
                    ))}
                  </div>
                  <AppBtn btnText="Explore All Services" onClick={() => { router.push("/our-services"); goTop(); }} width="100%" height="50px" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Section - Full Width */}
        {Service.priceData && Service.priceData.length > 0 && (
          <div className="w-full mt-12 mb-8">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Choose Your Plan</h2>
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
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                {Service.priceData.map((price, i) => {
                  // Extract period from price data if available (may not be in TypeScript type)
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
          </div>
        )}
      </div>

      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}
