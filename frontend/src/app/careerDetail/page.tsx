"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import parse from 'html-react-parser';
import { toast } from "react-toastify";

// Images (use public paths)
const smPageBG = "/assests/images/smPageBG.svg";
const locationIcon = "/assests/images/locationYicon.svg";
const timeIcon = "/assests/images/timeYicon.svg";
const attachIcon = "/assests/images/atatchIcon.svg";
const rightArrow = "/assests/images/rightArrow.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import { ServiceCard, DropBox } from "@/components/Tools";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchCategory } from "@/store/slices/categorySlice";
import { FetchJob } from "@/store/slices/jobSlice";
import { CreateApplication } from "@/store/slices/Application";
import { STATUSES } from "@/store/slices/status";

// Types
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  experienceYears?: string;
  noticePeriod?: string;
}

export default function CareerDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status} = useSelector((state: RootState) => state.job);
  const categoryData = useSelector((state: RootState) => state.category);
  const [currentNav, setCurrentNav] = React.useState("Careers");

  // Find job data by ID
  const jobData = data.find((val) => val?._id === id);

  // State
  const [applyPop, setApplyPop] = useState<boolean>(false);
  const [noticePeriod, setNoticePeriod] = useState<string>("");
  const [policyCheck, setPolicyCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [applicationFormVal, setApplicationFormVal] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    experienceYears: "",
    currentJobTitle: "",
    expectedSalary: "",
  });
  const [fileUrls, setFileUrls] = useState<string>("");
  const [uploadFileName, setUploadFileName] = useState<string>("");

  // Notice period options
  const noticePList = [
    "Less than 15 days",
    "30 Days",
    "60 Days",
    "90 Days"
  ];

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!applicationFormVal.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!applicationFormVal.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationFormVal.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!applicationFormVal.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(applicationFormVal.phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!applicationFormVal.address.trim()) {
      errors.address = "Address is required";
    }
    
    if (!applicationFormVal.experienceYears.trim()) {
      errors.experienceYears = "Work experience is required";
    } else if (isNaN(Number(applicationFormVal.experienceYears)) || Number(applicationFormVal.experienceYears) < 0) {
      errors.experienceYears = "Please enter a valid number of years";
    }
    
    if (!noticePeriod) {
      errors.noticePeriod = "Notice period is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationFormVal((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle popup close
  const handlePopClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "grayBox") {
      setApplyPop(false);
      // Reset form when closing
      setFormErrors({});
      setApplicationFormVal({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        experienceYears: "",
        currentJobTitle: "",
        expectedSalary: "",
      });
      setNoticePeriod("");
      setPolicyCheck(false);
      setFileUrls("");
      setUploadFileName("");
    }
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadFileName(file.name);

    try {
      const filename = encodeURIComponent(file.name);
      const formData = new FormData();
      formData.append('file', file);

      // For now, just set a placeholder URL
      // In production, you'd upload to your server
      setFileUrls(`/uploads/${filename}`);
      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed!");
    }
  };

  // Create application
  const postApplication = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly!");
      return;
    }

    if (!policyCheck) {
      toast.error("Please agree to Terms & Privacy Policy!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(CreateApplication({
        jobId: id,
        fullName: applicationFormVal.fullName,
        email: applicationFormVal.email,
        phone: applicationFormVal.phone,
        address: applicationFormVal.address,
        experienceYears: applicationFormVal.experienceYears,
        currentJobTitle: applicationFormVal.currentJobTitle,
        expectedSalary: applicationFormVal.expectedSalary,
        noticePeriod: noticePeriod,
        resume: fileUrls,
      }));

      toast.success("Application submitted successfully!");
      setApplyPop(false);
      
      // Reset form after successful submission
      setApplicationFormVal({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        experienceYears: "",
        currentJobTitle: "",
        expectedSalary: "",
      });
      setNoticePeriod("");
      setPolicyCheck(false);
      setFileUrls("");
      setUploadFileName("");
      setFormErrors({});
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle body overflow
  useEffect(() => {
    if (applyPop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [applyPop]);

  // Fetch data
  useEffect(() => {
    dispatch(FetchCategory());
    dispatch(FetchJob());
  }, [dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Apply Job Popup */}
      <div
        id="grayBox"
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          applyPop 
            ? "opacity-100 backdrop-blur-sm bg-black/30" 
            : "opacity-0 pointer-events-none backdrop-blur-none bg-black/0"
        }`}
        onClick={handlePopClose}
      >
        <div 
          className={`w-11/12 md:w-3/5 lg:w-2/5 max-w-2xl bg-white rounded-3xl shadow-2xl transition-all duration-500 transform ${
            applyPop 
              ? "scale-100 opacity-100 translate-y-0" 
              : "scale-95 opacity-0 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Apply for this Job</h2>
              <button
                onClick={() => setApplyPop(false)}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-orange-100 mt-2">Fill out the form below to apply for this position</p>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={applicationFormVal?.fullName} 
                  onChange={handleChange}
                  className={`w-full h-12 border rounded-xl px-4 transition-all duration-200 ${
                    formErrors.fullName 
                      ? "border-red-400 bg-red-50 focus:ring-red-400" 
                      : "border-gray-300 bg-gray-50 focus:ring-orange-400"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={applicationFormVal?.email} 
                  onChange={handleChange}
                  className={`w-full h-12 border rounded-xl px-4 transition-all duration-200 ${
                    formErrors.email 
                      ? "border-red-400 bg-red-50 focus:ring-red-400" 
                      : "border-gray-300 bg-gray-50 focus:ring-orange-400"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={applicationFormVal?.phone} 
                  onChange={handleChange}
                  className={`w-full h-12 border rounded-xl px-4 transition-all duration-200 ${
                    formErrors.phone 
                      ? "border-red-400 bg-red-50 focus:ring-red-400" 
                      : "border-gray-300 bg-gray-50 focus:ring-orange-400"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.phone}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Experience <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="experienceYears" 
                  value={applicationFormVal?.experienceYears} 
                  onChange={handleChange}
                  className={`w-full h-12 border rounded-xl px-4 transition-all duration-200 ${
                    formErrors.experienceYears 
                      ? "border-red-400 bg-red-50 focus:ring-red-400" 
                      : "border-gray-300 bg-gray-50 focus:ring-orange-400"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="Years of experience"
                  min="0"
                />
                {formErrors.experienceYears && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.experienceYears}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="address" 
                value={applicationFormVal?.address} 
                onChange={handleChange}
                rows={3}
                className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 resize-none ${
                  formErrors.address 
                    ? "border-red-400 bg-red-50 focus:ring-red-400" 
                    : "border-gray-300 bg-gray-50 focus:ring-orange-400"
                } focus:outline-none focus:ring-2 focus:border-transparent`}
                placeholder="Enter your complete address"
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Job Title</label>
                <input 
                  type="text" 
                  name="currentJobTitle" 
                  value={applicationFormVal?.currentJobTitle} 
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Your current position"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Salary</label>
                <input 
                  type="text" 
                  name="expectedSalary" 
                  value={applicationFormVal?.expectedSalary} 
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Expected salary range"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notice Period <span className="text-red-500">*</span>
              </label>
              <DropBox 
                list={noticePList} 
                setDropVal={setNoticePeriod} 
                defaultVal="Select Notice Period" 
                width="100%"
              />
              {formErrors.noticePeriod && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.noticePeriod}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume Upload</label>
              <label htmlFor="attachFile" className="cursor-pointer">
                <div className="w-full h-14 flex items-center gap-3 px-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 transition-all duration-300">
                  <Image src={attachIcon} alt="Attach" width={24} height={24} />
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">
                      {uploadFileName.length ? uploadFileName.slice(0, 20) + (uploadFileName.length > 20 ? "..." : "") : "Click to upload your resume"}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                  <input
                    id="attachFile"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <input 
                type="checkbox" 
                checked={policyCheck}
                onChange={(e) => setPolicyCheck(e.target.checked)}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer mt-0.5"
              />
              <div>
                <p className="text-sm text-gray-700">
                  I agree to the{" "}
                  <span className="text-orange-500 hover:text-orange-600 cursor-pointer underline">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-orange-500 hover:text-orange-600 cursor-pointer underline">Privacy Policy</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  By submitting this application, you consent to our processing of your personal data.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <AppBtn 
                disabled={!policyCheck || isSubmitting} 
                btnText={isSubmitting ? "Submitting..." : "Submit Application"} 
                icon={rightArrow} 
                onClick={postApplication}
                width="100%"
                height="56px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full h-[250px] flex flex-col relative bg-gradient-to-br from-orange-50 via-yellow-50 to-transparent text-black md:h-[300px] lg:h-[350px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover opacity-20" alt="Page Background" fill priority />
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-center mt-20 px-4">
          <nav className="flex items-center space-x-2 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Home
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span 
              onClick={() => router.push("/careers")} 
              className="cursor-pointer text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Careers
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-800 font-semibold">{jobData?.metaTitle || "Job Details"}</span>
          </nav>
        </div>
      </div>

      {/* Loading State */}
      {status === STATUSES.LOADING && (
        <div className="w-full px-4 md:px-8 lg:px-16 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-gray-600">Loading job details...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Not Found */}
      {status !== STATUSES.LOADING && !jobData && (
        <div className="w-full px-4 md:px-8 lg:px-16 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.571M15 6.343A7.962 7.962 0 0112 9c-2.34 0-4.29-1.009-5.824-2.571" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
                <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
                <AppBtn 
                  btnText="Back to Careers" 
                  onClick={() => router.push("/careers")}
                  width="200px"
                  height="45px"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      {status !== STATUSES.LOADING && jobData && (
        <div className="w-full px-4 md:px-8 lg:px-16 py-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Job Content */}
              <div className="w-full lg:w-2/3">
                {/* Job Header */}
                <div className="mb-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      {jobData?.title}
                    </h1>
                    
                    {/* Job Info Cards */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div className="flex flex-wrap gap-3">
                        <div className="h-12 flex items-center gap-3 px-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl hover:shadow-md transition-all duration-300">
                          <Image src={locationIcon} alt="Location" width={18} height={18} />
                          <p className="text-sm font-medium text-gray-700">{jobData?.location}</p>
                        </div>
                        <div className="h-12 flex items-center gap-3 px-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl hover:shadow-md transition-all duration-300">
                          <Image src={timeIcon} alt="Type" width={18} height={18} />
                          <p className="text-sm font-medium text-gray-700">{jobData?.type}</p>
                        </div>
                        <div className="h-12 flex items-center gap-3 px-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl hover:shadow-md transition-all duration-300">
                          <Image src={locationIcon} alt="Job Location" width={18} height={18} />
                          <p className="text-sm font-medium text-gray-700">{jobData?.jobLocation}</p>
                        </div>
                      </div>
                      
                      <AppBtn 
                        btnText="Apply Now" 
                        onClick={() => {
                          setApplyPop(true);
                          goTop();
                        }}
                        width="160px"
                        height="50px"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed mb-8">
                      {parse(jobData?.description || "")}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Required</h3>
                    <div className="text-gray-700 leading-relaxed">
                      {parse(jobData?.experience || "")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-1/3">
                <div className="sticky top-8">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border border-orange-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Our Services
                    </h3>
                    <div className="space-y-4 mb-6">
                      {categoryData?.data?.length ? (
                        categoryData?.data?.slice(0, 2).map((el, i) => (
                          <div key={i} className="transform hover:scale-105 transition-transform duration-200">
                            <ServiceCard {...el} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <AppBtn 
                      btnText="Explore All Services" 
                      onClick={() => {
                        router.push("/services");
                        goTop();
                      }}
                      width="100%"
                      height="50px"
                    />
                  </div>
                  
                  {/* Quick Apply Card */}
                  <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Ready to join our team? Apply now and take the first step towards your new career.
                    </p>
                    <AppBtn 
                      btnText="Apply Now" 
                      onClick={() => {
                        setApplyPop(true);
                        goTop();
                      }}
                      width="100%"
                      height="45px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}