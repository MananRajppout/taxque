"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const pageBg = "/assests/images/otherPageBg.svg";
const trustPatnarImg = "/assests/images/trustPatnarImg.svg";
const oslImg1 = "/assests/images/oslImg1.png";
const oslImg2 = "/assests/images/oslImg2.png";
const arrow = "/assests/images/arrow.png";
const taxQueImg = "/assests/images/TaxQueImg.png";
const YellowBg = "/assests/images/YellowBg.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import WCTQCarousel from "@/components/WCTQCarousel";
import MyCarousel from "@/components/Carousel";
import Subscribe from "@/components/Subscribe";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchTeam } from "@/store/slices/teamSlice";

export default function AboutUs() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.team);
  const [currentNav, setCurrentNav] = React.useState("About Us");

  useEffect(() => {
    dispatch(FetchTeam());
    if (data?.length < 0) {
      dispatch(FetchTeam());
    }
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <div className="w-full h-[200px] flex flex-col relative bg-transparent text-black md:h-[250px] lg:h-[300px]">
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
            <span className="text-gray-800 font-medium">About Us</span>
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            Welcome to TaxQue
          </h1>
        </div>
      </div>
    
      <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center gap-12 py-12 px-4 md:px-8 lg:px-16">
        <div className="w-full md:w-3/5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left text-gray-900 mb-6">
            India's Largest Business Services Platform
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center md:text-left">
            At TaxQue by ARB Fintech LLP, we are dedicated to empowering businesses and individuals with seamless, reliable, and innovative solutions for their accounting, tax, and compliance needs. Founded in 2019 by Md Afzal, TaxQue has grown from a humble proprietorship into a trusted name, serving clients across India. With our corporate office in Patna, we manage all business activities from this vibrant hub, while ARB Fintech LLP, which fully owns the TaxQue brand, maintains its registered office in Vaishali, Bihar. TaxQue is a registered trademark fully owned by ARB Fintech LLP, reflecting our evolution into a leading business services platform.
          </p>
        </div>
        <div className="w-full md:w-2/5">
          <Image src={trustPatnarImg} alt="Trust Partner" width={500} height={400} className="w-full h-auto rounded-lg" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          Our Story Line
        </h2>
        
        <div className="w-full max-w-4xl space-y-6">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            TaxQue began in 2019 as a proprietorship, driven by Md Afzal's vision to simplify the complexities of taxation, compliance, and business management for entrepreneurs and professionals across India. Starting with a small but ambitious team, we quickly gained traction by addressing the challenges of navigating regulatory landscapes. In 2021, we took a significant step forward by incorporating as TaxQue LLP, a legal entity registered in Jalandhar, Punjab, solidifying our foundation and expanding our capabilities.
          </p>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            In 2022, we applied for trademarks under the ownership of ARB Fintech LLP, which has its registered office in Vaishali, Bihar. By 2023, the TaxQue brand became fully owned by ARB Fintech LLP, operating as TaxQue by ARB Fintech LLP. This transition strengthened our position, enabling us to leverage advanced resources and technology to better serve our clients. To streamline operations and enhance accessibility, we established our corporate office in Patna, where all TaxQue business activities are now managed, serving clients nationwide with efficiency and dedication.
          </p>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            From our origins in Jalandhar to our current base in Patna, TaxQue by ARB Fintech LLP has evolved into India's largest business services platform, supporting thousands of clients with unparalleled expertise. Whether you're a startup, a small business, or an established enterprise, we are here to simplify your journey and fuel your success.
          </p>
        </div>

        <div className="w-full max-w-6xl mt-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="w-full lg:w-5/12">
              <div className="w-full h-64 overflow-hidden rounded-2xl mb-6">
                <Image src={oslImg1} alt="Mission" width={400} height={260} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Mission</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Our mission is to provide comprehensive, accessible, and high-quality accounting, tax, and legal solutions that empower our clients to thrive in a dynamic business environment. We are committed to:
                </p>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li><strong>Simplifying Complexity:</strong> Streamlining intricate processes like tax filing, compliance, and business registration through intuitive technology and expert guidance.</li>
                  <li><strong>Empowering Clients:</strong> Equipping businesses and individuals with tailored solutions and actionable insights to make informed financial decisions.</li>
                  <li><strong>Ensuring Accessibility:</strong> Offering 24/7 online services that eliminate the need for physical visits, making professional support available to clients across India.</li>
                  <li><strong>Delivering Excellence:</strong> Maintaining the highest standards of professionalism, integrity, and accuracy in every service we provide.</li>
                  <li><strong>Driving Innovation:</strong> Continuously enhancing our platform with cutting-edge tools and personalized support to meet the evolving needs of our clients.</li>
                  <li><strong>Building Trust:</strong> Cultivating long-term relationships by prioritizing transparency, affordability, and customer satisfaction in all our interactions.</li>
                </ul>
                <p className="text-base text-gray-600 leading-relaxed">
                  Through these principles, we strive to be the go-to partner for businesses and individuals, helping them navigate challenges and seize opportunities with confidence.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="space-y-4 mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Vision</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  To become India's most trusted and forward-thinking business services platform, revolutionizing the way businesses and individuals manage their financial, tax, and compliance obligations. We envision a future where every entrepreneur, small business owner, and professional can access world-class services effortlessly, leveraging technology to eliminate barriers of complexity, cost, and geography. By fostering innovation, transparency, and excellence, we aim to empower our clients to achieve sustainable growth and financial success, setting a benchmark for reliability and customer satisfaction in the industry.
                </p>
              </div>
              <div className="w-full h-64 overflow-hidden rounded-2xl">
                <Image src={oslImg2} alt="Vision" width={400} height={260} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] relative flex items-center justify-center flex-col bg-transparent md:h-[500px] lg:h-[600px]">
        <Image src={taxQueImg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Tax Que" fill />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8 z-10">
          Why Choose TaxQue?
        </h2>
        <div className="w-full z-10">
          <WCTQCarousel />
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          Our Commitment
        </h2>
        
        <div className="w-full max-w-4xl space-y-6">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
            Your success is our priority. At TaxQue by ARB Fintech LLP, we are committed to building lasting relationships by delivering exceptional service with integrity and professionalism. We aim to make your experience effortless and rewarding, whether you're filing taxes, registering a business, or seeking financial advice.
          </p>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
            We take pride in simplifying complex processes, allowing you to focus on growing your business and achieving your dreams with confidence.
          </p>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
            <strong>Get in Touch:</strong><br />
            We are excited to be part of your journey and are committed to serving you with the passion and excellence that define TaxQue by ARB Fintech LLP. Have questions or need assistance? Visit www.taxque.in or contact us today to request a quote.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-12 px-4 md:px-8 lg:px-16 relative">
        <Image src={YellowBg} className="absolute top-0 left-0 w-full h-auto -z-10 opacity-20" alt="Background" width={600} height={400} />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 z-10">
          Leadership & Management
        </h2>
        <div className="w-full z-10">
          <MyCarousel data={data} cardName="memberCard" />
        </div>
        <div className="mt-12 z-10">
          <AppBtn btnText="Explore" width="200px" height="40px" />
        </div>
      </div>

      <Subscribe />

      <Footer />
    </div>
  );
}