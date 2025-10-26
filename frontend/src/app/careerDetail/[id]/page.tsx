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
import { AppBtn, AppHoloBtn } from "@/components/Button";
import { ServiceCard, DropBox } from "@/components/Tools";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchCategory } from "@/store/slices/categorySlice";
import { FetchJob } from "@/store/slices/jobSlice";
import { CreateApplication } from "@/store/slices/Application";

export default function CareerDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const { data = [] } = useSelector((state: RootState) => state.job);
  const categoryData = useSelector((state: RootState) => state.category);
  const [currentNav, setCurrentNav] = React.useState("Careers");

  // Mock job data for static job cards
  const mockJobData = {
    "frontend-developer": {
      _id: "frontend-developer",
      title: "Frontend Developer",
      location: "Bangalore, India",
      type: "Full-time",
      jobLocation: "Hybrid",
      metaTitle: "Frontend Developer",
      description: `
        <p>We are seeking a talented and passionate Frontend Developer to join our dynamic team at Taxque. As a Frontend Developer, you will play a crucial role in creating exceptional user experiences and building responsive, interactive web applications.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Develop and maintain responsive web applications using modern frontend technologies</li>
          <li>Collaborate with UI/UX designers to implement pixel-perfect designs</li>
          <li>Optimize applications for maximum speed and scalability</li>
          <li>Ensure cross-browser compatibility and mobile responsiveness</li>
          <li>Participate in code reviews and maintain high code quality standards</li>
          <li>Work closely with backend developers to integrate APIs and services</li>
          <li>Stay updated with the latest frontend technologies and best practices</li>
          <li>Contribute to the development of reusable components and design systems</li>
        </ul>
        
        <h4>What We Offer:</h4>
        <ul>
          <li>Competitive salary and comprehensive benefits package</li>
          <li>Flexible working hours and remote work options</li>
          <li>Professional development opportunities and training programs</li>
          <li>Collaborative and innovative work environment</li>
          <li>Opportunity to work on cutting-edge projects</li>
        </ul>
      `,
      experience: `
        <h4>Required Qualifications:</h4>
        <ul>
          <li><strong>2-4 years</strong> of professional experience in frontend development</li>
          <li>Proficiency in <strong>React.js</strong> and modern JavaScript (ES6+)</li>
          <li>Strong knowledge of <strong>HTML5, CSS3</strong> and responsive design principles</li>
          <li>Experience with CSS frameworks like <strong>Tailwind CSS</strong> or <strong>Bootstrap</strong></li>
          <li>Familiarity with <strong>Next.js</strong> or similar React frameworks</li>
          <li>Understanding of <strong>RESTful APIs</strong> and asynchronous programming</li>
          <li>Experience with version control systems, preferably <strong>Git</strong></li>
          <li>Knowledge of build tools like <strong>Webpack, Vite</strong> or similar</li>
          <li>Basic understanding of <strong>TypeScript</strong> is a plus</li>
          <li>Experience with testing frameworks like <strong>Jest</strong> or <strong>Cypress</strong></li>
          <li>Strong problem-solving skills and attention to detail</li>
          <li>Excellent communication and teamwork abilities</li>
        </ul>
        
        <h4>Preferred Skills:</h4>
        <ul>
          <li>Experience with state management libraries like <strong>Redux</strong> or <strong>Zustand</strong></li>
          <li>Knowledge of <strong>GraphQL</strong> and modern API technologies</li>
          <li>Experience with <strong>Progressive Web Apps (PWA)</strong></li>
          <li>Understanding of <strong>Web Performance</strong> optimization techniques</li>
          <li>Familiarity with <strong>Design Systems</strong> and component libraries</li>
          <li>Experience with <strong>Agile/Scrum</strong> development methodologies</li>
        </ul>
      `
    },
    "backend-engineer": {
      _id: "backend-engineer", 
      title: "Backend Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      jobLocation: "Remote",
      metaTitle: "Backend Engineer",
      description: `
        <p>We are looking for an experienced Backend Engineer to join our innovative team at Taxque. You will be responsible for designing, developing, and maintaining scalable backend systems that power our applications and services.</p>
        
        <h4>Key Responsibilities:</h4>
        <ul>
          <li>Design and develop robust, scalable backend APIs and microservices</li>
          <li>Implement secure authentication and authorization systems</li>
          <li>Optimize database queries and ensure efficient data storage</li>
          <li>Collaborate with frontend developers to integrate APIs seamlessly</li>
          <li>Implement monitoring, logging, and error handling mechanisms</li>
          <li>Participate in system architecture design and technical decision-making</li>
          <li>Write clean, maintainable, and well-documented code</li>
          <li>Conduct code reviews and mentor junior developers</li>
          <li>Stay updated with emerging backend technologies and best practices</li>
        </ul>
        
        <h4>What We Offer:</h4>
        <ul>
          <li>Competitive salary and comprehensive benefits package</li>
          <li>100% remote work flexibility</li>
          <li>Professional development opportunities and conference attendance</li>
          <li>Cutting-edge technology stack and modern development practices</li>
          <li>Collaborative team environment with experienced developers</li>
        </ul>
      `,
      experience: `
        <h4>Required Qualifications:</h4>
        <ul>
          <li><strong>3-5 years</strong> of professional backend development experience</li>
          <li>Proficiency in <strong>Node.js</strong> and <strong>JavaScript/TypeScript</strong></li>
          <li>Strong experience with <strong>Python</strong> and frameworks like <strong>Django/Flask</strong></li>
          <li>Expertise in <strong>RESTful API</strong> design and development</li>
          <li>Experience with <strong>GraphQL</strong> and modern API technologies</li>
          <li>Strong knowledge of <strong>SQL</strong> and <strong>NoSQL</strong> databases</li>
          <li>Experience with <strong>PostgreSQL, MongoDB</strong> or similar databases</li>
          <li>Understanding of <strong>microservices architecture</strong> and patterns</li>
          <li>Experience with <strong>Docker</strong> and containerization</li>
          <li>Knowledge of <strong>cloud platforms</strong> like AWS, Azure, or GCP</li>
          <li>Experience with <strong>CI/CD</strong> pipelines and DevOps practices</li>
          <li>Strong problem-solving skills and analytical thinking</li>
          <li>Excellent communication and collaboration skills</li>
        </ul>
        
        <h4>Preferred Skills:</h4>
        <ul>
          <li>Experience with <strong>Redis</strong> for caching and session management</li>
          <li>Knowledge of <strong>Message Queues</strong> like RabbitMQ or Apache Kafka</li>
          <li>Experience with <strong>Serverless</strong> architectures and functions</li>
          <li>Understanding of <strong>Security best practices</strong> and OWASP guidelines</li>
          <li>Experience with <strong>API Gateway</strong> and service mesh technologies</li>
          <li>Knowledge of <strong>Performance monitoring</strong> and optimization tools</li>
        </ul>
      `
    }
  };

  // Find job data by ID
  const jobData = data.find((val: any) => val?._id === id) || mockJobData[id as keyof typeof mockJobData];

  // State
  const [applyPop, setApplyPop] = useState<boolean>(false);
  const [noticePeriod, setNoticePeriod] = useState<string>("");
  const [policyCheck, setPolicyCheck] = useState(false);
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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationFormVal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle popup close
  const handlePopClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "grayBox") {
      setApplyPop(false);
    }
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid document (PDF, DOC, or DOCX)");
      return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB");
      return;
    }
    
    setUploadFileName(file.name);
    
    // For now, just store the file name - we'll send it as a reference
    // In a production environment, you would upload to cloud storage
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    setFileUrls(`resume_${timestamp}_${sanitizedFileName}`);
    
    toast.success("File selected successfully!");
  };

  // Create application
  const postApplication = async () => {
    // Validate required fields
    if (!id) {
      toast.error("Job ID is missing!");
      return;
    }
    
    if (!noticePeriod) {
      toast.warn("Please select a notice period!");
      return;
    }
    
    if (!applicationFormVal.fullName || !applicationFormVal.email || !applicationFormVal.phone || !applicationFormVal.address) {
      toast.warn("Please fill all required fields!");
      return;
    }
    
    // Resume is optional - if not uploaded, use a placeholder
    const finalResumeUrl = fileUrls || "No resume uploaded";
    
    if (!policyCheck) {
      toast.warn("Please accept the terms and conditions!");
      return;
    }

    // Submit application
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
        resume: finalResumeUrl,
      })).unwrap();
      
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
      setFileUrls("");
      setUploadFileName("");
      setPolicyCheck(false);
      setApplyPop(false);
      
      // Reload after a short delay to show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Application submission failed:", error);
      // Error toast is already handled in the CreateApplication thunk
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
    if (categoryData?.data?.length < 0) {
      dispatch(FetchCategory());
    }
    if (data?.length < 0) {
      dispatch(FetchJob());
    }
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx global>{`
        .navbar-container {
          background-color: white !important;
        }
        .navbar-container * {
          background-color: white !important;
        }
      `}</style>
      <div className="min-h-screen bg-white">
      <div className="navbar-container bg-white fixed top-0 left-0 right-0 z-40 shadow-sm" style={{backgroundColor: 'white !important'}}>
        <div className="navbar-container bg-white" style={{backgroundColor: 'white !important'}}>
          <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        </div>
      </div>
      
      {/* Apply Job popup */}
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
          <div className="p-6 max-h-[70vh] overflow-y-auto bg-gradient-to-br from-green-100 to-yellow-100">
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
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
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
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={applicationFormVal?.phone} 
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
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
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Years of experience"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="address" 
                value={applicationFormVal?.address} 
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter your complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Job Title</label>
                <input 
                  type="text" 
                  name="currentJobTitle" 
                  value={applicationFormVal?.currentJobTitle} 
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
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
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  placeholder="Expected salary range"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notice Period <span className="text-red-500">*</span>
              </label>
              <DropBox 
                list={noticePList} 
                setDropVal={setNoticePeriod} 
                defaultVal="Select Notice Period" 
                width="100%"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume Upload</label>
              <label htmlFor="attachFile" className="cursor-pointer">
                <div className="w-full h-14 flex items-center gap-3 px-4 bg-orange-100 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 hover:bg-orange-200 transition-all duration-300">
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

            <div className="flex items-start gap-3 p-4 bg-white rounded-xl mt-4">
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
              </div>
            </div>

            <div className="pt-4">
              <AppBtn 
                disabled={!policyCheck} 
                btnText="Submit Application" 
                icon={rightArrow} 
                onClick={postApplication}
                width="100%"
                height="56px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full px-4 md:px-8 lg:px-16 pt-8 pb-0 bg-white mt-20 min-h-screen">
        <div className="w-full max-w-7xl mx-auto">
          {/* Navigation Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm md:text-base mb-8">
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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Job Content */}
            <div className="w-full lg:w-2/3">
              {/* Job Header */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {jobData?.title}
                  </h1>
                  
                  {/* Job Info Cards */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex flex-wrap gap-3">
                      <div className="h-10 flex items-center gap-2 px-3 bg-orange-50 border border-orange-200 rounded-md hover:bg-orange-100 transition-all duration-300">
                        <Image src={locationIcon} alt="Location" width={18} height={18} />
                        <p className="text-sm font-medium text-gray-700">{jobData?.location}</p>
                      </div>
                      <div className="h-10 flex items-center gap-2 px-3 bg-orange-50 border border-orange-200 rounded-md hover:bg-orange-100 transition-all duration-300">
                        <Image src={timeIcon} alt="Type" width={18} height={18} />
                        <p className="text-sm font-medium text-gray-700">{jobData?.type}</p>
                      </div>
                      <div className="h-10 flex items-center gap-2 px-3 bg-orange-50 border border-orange-200 rounded-md hover:bg-orange-100 transition-all duration-300">
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
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-600 leading-relaxed mb-8">
                    {parse(jobData?.description || "")}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Required</h3>
                  <div className="text-gray-600 leading-relaxed">
                    {parse(jobData?.experience || "")}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-200">
                      <Image 
                        src="/piv.jpg" 
                        alt="Services" 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Our Services
                    </h3>
                  </div>
                  <div className="space-y-4 mb-6">
                    {/* Mock Service Cards */}
                    <div 
                      className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Top Section */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-3 md:gap-4 mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/assests/images/ITNIcon.svg"
                              alt="Service Icon"
                              width={24}
                              height={24}
                              className="w-6 h-6 md:w-7 md:h-7"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">ITR Filing</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Complete Income Tax Return filing services with expert guidance and support.</p>
                          </div>
                        </div>
                        
                        {/* Read More Button */}
                        <button
                          onClick={() => router.push('/our-services')}
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

                    {/* Second Service Card */}
                    <div 
                      className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-200 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Top Section */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-3 md:gap-4 mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/assests/images/ITNIcon.svg"
                              alt="Service Icon"
                              width={24}
                              height={24}
                              className="w-6 h-6 md:w-7 md:h-7"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">GST Registration</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Professional GST registration services for businesses of all sizes.</p>
                          </div>
                        </div>
                        
                        {/* Read More Button */}
                        <button
                          onClick={() => router.push('/our-services')}
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

      <Footer />
    </div>
    </>
  );
}
