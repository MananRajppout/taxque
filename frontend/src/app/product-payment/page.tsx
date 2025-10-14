"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const smPageBG = "/assests/images/smPageBG.svg";
const GSTIcon = "/assests/images/gstIcon.svg";
const GSTImg = "/assests/images/GSTCardImg.png";
const priceLabelBox = "/assests/images/priceLabelIcon.svg";
const greenTik = "/assests/images/greenTikV2.svg";
const grayTik = "/assests/images/grayTick.svg";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import Subscribe from "@/components/Subscribe";

export default function ProductPaymentPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = React.useState("Pricing");

  return (
    <div className="w-full min-h-screen bg-white text-black">
         
      <div className="w-full h-[150px] md:h-[200px] lg:h-[250px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
       
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
       
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">Pricing</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">GST Compliance and Filing</span>
          </p>
        </div>
      </div>

     
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
           
            <div className="w-full lg:w-2/3">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  ECA Assisted - Standard
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  Basic Price: ₹1274
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  ₹2599 <span className="text-lg font-normal">/month</span>
                </p>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  Stay on top of your GST obligations with our comprehensive
                  compliance solutions. From timely filing to advisory services,
                  we handle it all so you can focus on growing your business.
                </p>

               
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Image src={priceLabelBox} alt="Feature" width={20} height={20} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Lowest Tax Filing Fees in India
                      </h3>
                      <p className="text-gray-600">
                        GST registration in India is free of charge when applied for
                        through the official GST portal (www.gst.gov.in).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Image src={priceLabelBox} alt="Feature" width={20} height={20} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Reliable and Secure ITR Filing Platform
                      </h3>
                      <p className="text-gray-600">
                        GST registration in India is free of charge when applied for
                        through the official GST portal (www.gst.gov.in).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Image src={priceLabelBox} alt="Feature" width={20} height={20} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Tax Filing for all - Business Owners, Salaried Persons
                      </h3>
                      <p className="text-gray-600">
                        GST registration in India is free of charge when applied for
                        through the official GST portal (www.gst.gov.in).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="w-full lg:w-1/3">
              <div className="bg-gradient-to-br from-green-100/90 via-yellow-100/90 to-transparent border border-green-200/50 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">We're Here To Get In Touch</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea 
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <p className="text-sm text-gray-600">I Agree to Terms & Conditions and Privacy Policy</p>
                  </div>
                  
                  <AppBtn btnText="Submit Now" width="100%" height="50px" />
                </div>
              </div>
            </div>
          </div>


          <div className="mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <Image src={GSTIcon} alt="GST" width={40} height={40} />
                <h2 className="text-2xl font-bold text-gray-900">GST Compliance and Filing</h2>
              </div>
              <Image src={GSTImg} alt="GST Card" className="w-full h-auto rounded-2xl" />
            </div>

            
            <div className="w-full lg:w-1/2">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                GST Registration Fees in India: Charges, Penalties & Payment Process
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Stay on top of your GST obligations with our comprehensive
                compliance solutions. From timely filing to advisory services,
                we handle it all so you can focus on growing your business.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Affordable & Transparent:</h4>
                  <p className="text-gray-600">
                    GST registration in India is free of charge when applied for
                    through the official GST portal (www.gst.gov.in).
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Comprehensive Compliance:</h4>
                  <p className="text-gray-600">
                    GST registration in India is free of charge when applied for
                    through the official GST portal (www.gst.gov.in).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            See features includes
          </h2>
          
          <div className="w-full overflow-x-auto">
            <div className="min-w-[990px] bg-white rounded-2xl border border-gray-200 shadow-lg">
              
              <div className="flex bg-yellow-50 rounded-t-2xl">
                <div className="w-[30%] min-h-16 flex items-center justify-start px-5">
                  <p></p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-900">Standard</p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-900">NRI</p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-900">Business Income</p>
                </div>
              </div>

              
              <div className="flex border-t border-gray-200">
                <div className="w-[30%] min-h-16 flex items-center justify-start px-5">
                  <p className="font-medium text-gray-700">Price</p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-bold text-orange-500">₹ 1274</p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-bold text-orange-500">₹ 2655</p>
                </div>
                <div className="w-[23%] min-h-16 flex items-center justify-center">
                  <p className="text-lg font-bold text-orange-500">₹ 7968</p>
                </div>
              </div>

              {/* Feature Rows */}
              {[
                { feature: "Interest & Other Sources Income", standard: true, nri: false, business: true },
                { feature: "Expanded set of self-help tools", standard: false, nri: true, business: true },
                { feature: "Examination of previous year ITR", standard: true, nri: true, business: false },
                { feature: "26AS Data Import", standard: true, nri: false, business: true },
                { feature: "Tax Payment Assistance", standard: false, nri: true, business: true }
              ].map((row, index) => (
                <div key={index} className="flex border-t border-gray-200">
                  <div className="w-[30%] min-h-16 flex items-center justify-start px-5">
                    <p className="font-medium text-gray-700">{row.feature}</p>
                  </div>
                  <div className="w-[23%] min-h-16 flex items-center justify-center">
                    <Image src={row.standard ? greenTik : grayTik} alt="Feature" width={20} height={20} />
                  </div>
                  <div className="w-[23%] min-h-16 flex items-center justify-center">
                    <Image src={row.nri ? greenTik : grayTik} alt="Feature" width={20} height={20} />
                  </div>
                  <div className="w-[23%] min-h-16 flex items-center justify-center">
                    <Image src={row.business ? greenTik : grayTik} alt="Feature" width={20} height={20} />
                  </div>
                </div>
              ))}
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
