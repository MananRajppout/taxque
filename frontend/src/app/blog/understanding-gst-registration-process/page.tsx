"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Axios from "axios";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";


const HPTImg = "/assests/images/GSTCardImg.png";


const personIcon = "/assests/images/UserIcon.png";
const emailIcon = "/assests/images/emailIcon.svg";
const phoneIcon = "/assests/images/phoneIcon.svg";
const locationIcon = "/assests/images/locationYicon.svg";
const downArrow = "/assests/images/down-arrow.svg";

export default function BlogPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = useState("Guide");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    service: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.location || !formData.service) {
      toast.warn("Please fill all the fields!");
      return;
    }

    try {
      await Axios.post(`${baseURL}/contact-user/create`, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: {
          City: formData.location,
          State: "Unknown",
          Pincode: "000000",
          PostOffice: "",
        },
        date: new Date().toLocaleDateString("en-GB"),
        section: "Blog",
        service: formData.service
      });
      toast.success("Your information submitted successfully.");
      setFormData({ fullName: "", email: "", phone: "", location: "", service: "" });
    } catch (error: any) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const services = [
    "ITR Filing",
    "GST Registration",
    "Company Registration",
    "Trademark Registration",
    "TDS Return Filing",
    "GST Return Filing",
    "Other Services"
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-white shadow-sm">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      
      <div className="px-4 md:px-8 lg:px-16 pt-20 pb-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-orange-500 mb-6">
            <span className="hover:text-orange-600 cursor-pointer" onClick={() => router.push('/')}>Home</span>
            <span className="mx-2">&gt;</span>
            <span className="hover:text-orange-600 cursor-pointer" onClick={() => router.push('/blog')}>Goods and Service Tax</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">Understanding GST Registration Process</span>
          </nav>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-orange-500">
                  <Image src={personIcon} alt="Author" width={16} height={16} />
                  <span className="text-sm font-medium">Amit</span>
                </div>
                <div className="flex items-center gap-2 text-orange-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">15/01/2024</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Understanding GST Registration Process
              </h1>

              <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={HPTImg}
                  alt="GST Registration Guide"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is GST Registration?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  GST (Goods and Services Tax) Registration is mandatory for businesses and individuals whose turnover exceeds the prescribed threshold limits. It's a process that enables taxpayers to collect tax from their customers and avail input tax credit on their purchases, creating a smooth flow of tax payment throughout the supply chain.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Needs GST Registration?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  As per GST regulations, registration is mandatory if your annual aggregate turnover exceeds ₹20 lakhs for goods or ₹10 lakhs for services. Additionally, businesses involved in inter-state supply, e-commerce operators, and casual taxable persons must register regardless of turnover.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits of GST Registration</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Registered businesses can avail ITC (Input Tax Credit), which reduces the overall tax burden. They gain legal recognition for tax purposes, can participate in interstate commerce, and build credibility with customers and suppliers. Registration also enables businesses to expand their market reach without tax barriers.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Documents Required</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The essential documents include PAN card, Aadhaar card, business address proof, bank account details, business incorporation certificate (if applicable), authorization letter, photographs, and additional documents based on business type. For sole proprietorship, only PAN and Aadhaar along with address proof are needed.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Understanding the GST registration process is crucial for compliance and business growth. Ensure all documents are ready and accurate to avoid delays in the registration process.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200 sticky top-24">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  We're Here To Get In Touch
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm text-gray-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src={personIcon} alt="Person" width={16} height={16} />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm text-gray-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src={emailIcon} alt="Email" width={16} height={16} />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm text-gray-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src={phoneIcon} alt="Phone" width={16} height={16} />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter PIN code or City/State"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm text-gray-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Image src={locationIcon} alt="Location" width={16} height={16} />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer text-sm text-gray-800"
                    >
                      <option value="">Select A Service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image src={downArrow} alt="Dropdown" width={16} height={16} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                  >
                    Submit Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/assests/images/ITNIcon.svg"
                      alt="GST Registration Icon"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">GST Registration</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Complete GST registration services for your business</p>
                    <button className="w-24 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center justify-center">
                <Image
                  src="/piv.jpg"
                  alt="ELARA SPARES and Engineering"
                  width={200}
                  height={80}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/assests/images/ITNIcon.svg"
                      alt="GST Return Icon"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">GST Return Filing</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">Professional GST return filing services</p>
                    <button className="w-24 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center justify-center">
                <Image
                  src="/piv.jpg"
                  alt="ELARA SPARES and Engineering"
                  width={200}
                  height={80}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 md:py-12">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}

