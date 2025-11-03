"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import truncate from "truncate-html";

import type { CategoryDataType } from "@/store/slices/categorySlice";
import type { BlogDataType } from "@/store/slices/blogSlice";
import type { ServiceDataType } from "@/store/slices/serviceSlice";
import type { TeamDataType } from "@/store/slices/teamSlice";
import type { JobDataType } from "@/store/slices/jobSlice";

import { AppBtn, AppOrangeBtn, AppHoloBtn } from "@/components/Button";

const ITNIcon = "/assests/images/ITNIcon.svg";
const GreenTik = "/assests/images/GreenTik.svg";
const greenTik2 = "/assests/images/greenTikV2.svg";
const avatarIcom = "/assests/images/Avatar.svg";
const watchIcom = "/assests/images/timeIcon.svg";
const UPRightArrow = "/assests/images/right-up.svg";
const facebookIcon = "/assests/images/facebookIcon.svg";
const twittercon = "/assests/images/twitterIcon.svg";
const linkedinIcon = "/assests/images/linkdinIcon.svg";
const featuresIcon = "/assests/images/featuresIcon.png";
const locationIcon = "/assests/images/locationYicon.svg";
const watchYIcom = "/assests/images/watchYicon.svg";
const blackArrowIcon = "/assests/images/blackArrowIcon.svg";
const star = "/assests/images/star.png";


interface PriceCardProps {
  title: string;
  basicPrice: string;
  price: string;
  plan: string;
  summary: string;
  fetures: string[];
  MostPopular: boolean;
  priceTabe: number;
  index: number;
  isMobile: boolean;
  productName: string;
  id: string;
  priceId: string;
  className?: string;
}

interface FeaturesProps {
  title: string;
  summary: string;
  className?: string;
}

interface BenefitsProps {
  title: string;
  summary: string;
  index: number;
  className?: string;
}

interface DropProps {
  setDropVal: (value: string) => void;
  list?: (number | string)[];
  defaultVal: string;
  width?: string;
  className?: string;
}

interface ServiceCardProps extends CategoryDataType {
  className?: string;
}

interface BlogCardProps extends BlogDataType {
  className?: string;
}

interface PriceCardComponentProps extends PriceCardProps {
  className?: string;
}


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


export const ServiceCard = ({ 
  imageUrl, 
  title, 
  summary, 
  Slug, 
  _id, 
  className = "" 
}: ServiceCardProps) => {
  const router = useRouter();
  const truncatedHTML = truncate(summary || "", 100, { byWords: false });

  // Function to redirect all service cards to /our-services
  const getServiceRoute = (serviceTitle: string): string => {
    return '/our-services';
  };

  const handleClick = () => {
    if (_id) localStorage.setItem("selectedCategory", _id);
    const route = getServiceRoute(title);
    router.push(route);
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`w-full max-w-[383px] h-[520px] rounded-[20px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[rgba(100,100,111,0.3)_0px_10px_35px_0px] mx-0.5 sm:max-w-[400px] md:max-w-[450px] lg:max-w-[383px] ${className}`}>
      {/* Header Section - Light Green Background */}
      <div className="bg-gradient-to-br from-green-100/30 via-green-200/40 to-green-100/20 border border-green-200/50 rounded-t-[20px] p-[15px]">
        <div className="flex items-center gap-[10px]">
          <Image src={ITNIcon} alt="Service Icon" width={24} height={24} className="w-6 h-6" />
          <p onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} role="button" aria-label={`View ${title} service`} className="text-[14px] font-semibold cursor-pointer transition-colors duration-300 outline-none hover:text-[#fe8903] focus:text-[#fe8903] focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2 sm:text-[16px] md:text-[18px]">
            {title}
          </p>
        </div>
      </div>
      
      {/* Middle Section - White Background */}
      <div className="bg-white p-[15px] flex flex-col flex-1">
        <div className="w-full border-t border-gray-300/30 my-[10px]"></div>
        <p className="text-[12px] text-gray-600 leading-[18px] mb-[15px] flex-1 sm:text-[14px] sm:leading-[22px] md:text-[16px] md:leading-[24px]">{parse(typeof truncatedHTML === 'string' ? truncatedHTML : '')}</p>
        <AppHoloBtn onClick={handleClick} btnText="Read More" height="30px" width="110px" className="sm:h-[35px] sm:w-[120px] md:h-[40px] md:w-[130px]" />
      </div>
      
      {/* Bottom Image Section */}
      <div className="w-full h-[200px] rounded-b-[20px] overflow-hidden relative cursor-pointer outline-none focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2 sm:h-[220px] md:h-[250px]" onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} role="button" aria-label={`View ${title} details`}>
        <Image src={imageUrl || "/placeholder.jpg"} alt={title} fill priority={false} className="object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
      </div>

    </div>
  );
};

// Check Icon Component
const Check = ({ className, strokeWidth = 3 }: { className?: string; strokeWidth?: number }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Price Card Component
export const PriceCard = ({
  title, 
  basicPrice, 
  price, 
  plan = "Month", 
  summary, 
  fetures, // Keep for backward compatibility
  features, // New prop name
  MostPopular, // Keep for backward compatibility
  mostPopular, // New prop name
  priceTabe, 
  index, 
  isMobile, 
  productName, 
  id, 
  priceId,
  className = ""
}: PriceCardComponentProps & { features?: string[]; mostPopular?: boolean }) => {
  const router = useRouter();

  // Use new prop names if available, otherwise fall back to old ones
  const featuresList = features || fetures || [];
  const isMostPopular = mostPopular !== undefined ? mostPopular : (MostPopular || false);

  const handleBuyClick = () => {
    // Set payment data in localStorage for payment page
    if (id) localStorage.setItem("planServiceId", id);
    if (productName) localStorage.setItem("planServiceName", productName);
    if (priceId) localStorage.setItem("planPriceId", priceId);
    
    // Navigate to payment page
    router.push("/payment");
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBuyClick();
    }
  };

  const hasDiscount = basicPrice && basicPrice !== price && parseFloat(basicPrice) > parseFloat(price);

  return (
    <div
      style={{ display: isMobile ? (priceTabe === index ? "block" : "none") : "block" }}
      className={`w-full max-w-sm bg-white rounded-2xl shadow-lg relative transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Most Popular Badge */}
      {isMostPopular && (
        <div className="absolute top-4 right-4 bg-orange-400 text-white px-3 py-1 rounded-md text-xs font-semibold z-10">
          Most Popular
        </div>
      )}

      {/* Header Section */}
      <div className="w-full bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-8 pb-10">
        {/* Plan Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
        
        {/* Pricing Section */}
        <div className="w-full flex flex-col items-center mb-4">
          {/* Basic Price */}
          {basicPrice && (
            <p className="text-sm text-gray-500 mb-1">
              Basic Price: {hasDiscount && <span className="line-through">₹{basicPrice}</span>}
              {!hasDiscount && <span>₹{basicPrice}</span>}
            </p>
          )}
          
          {/* Current Price */}
          <p className="text-5xl font-bold text-orange-500 mb-2">
            ₹{price} <span className="text-xl font-normal text-gray-600">/{plan}</span>
          </p>
        </div>
        
        {/* Description */}
        {summary && (
          <p className="text-sm text-gray-700 text-center mb-6 px-2 leading-relaxed">
            {summary}
          </p>
        )}
        
        {/* Get Started Button */}
        <button
          onClick={handleBuyClick}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#1a2942] hover:bg-[#0f1929] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg"
          aria-label="Get Started Now"
        >
          Get Started Now
        </button>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-3 p-6 bg-white flex-1">
        {featuresList && featuresList.length > 0 ? (
          featuresList.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={3} />
              <p className="text-sm text-gray-700 leading-relaxed">{feature}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No features listed</p>
        )}
      </div>
    </div>
  );
};

// Member Card Component
interface MemberCardProps extends TeamDataType {
  className?: string;
}

export const MemberCard = ({ 
  name, 
  role, 
  summary, 
  imgUrl, 
  media, 
  className = "" 
}: MemberCardProps) => {
  return (
    <div className={`min-w-70 w-full bg-white rounded-5xl shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-5 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[rgba(100,100,111,0.3)_0px_10px_35px_0px] md:min-w-80 md:p-7.5 ${className}`}>
      <div className="w-30 h-30 rounded-full overflow-hidden mb-5 relative md:w-37.5 md:h-37.5 md:mb-6.25">
        <Image src={imgUrl || avatarIcom} alt={name} width={200} height={200} className="w-full h-full object-cover" />
      </div>
      <div className="w-full">
        <h3 className="text-5xl font-semibold text-gray-800 mb-2 m-0 md:text-6xl md:mb-2.5">{name}</h3>
        <p className="text-4xl text-[#fe8903] font-medium mb-3 m-0 md:text-4.5xl md:mb-3.75">{role}</p>
        <p className="text-3.5xl text-gray-600 leading-relaxed mb-5 m-0 md:text-4xl md:leading-6 md:mb-6.25">{summary}</p>
        <div className="flex justify-center gap-3.75">
          {media?.facebook && (
            <a href={media.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Facebook`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#fe8903] hover:-translate-y-0.5">
              <Image src={facebookIcon} alt="Facebook" width={20} height={20} className="transition-filter duration-300 ease-in-out hover:brightness-0 hover:invert" />
            </a>
          )}
          {media?.twitter && (
            <a href={media.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Twitter`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#fe8903] hover:-translate-y-0.5">
              <Image src={twittercon} alt="Twitter" width={20} height={20} className="transition-filter duration-300 ease-in-out hover:brightness-0 hover:invert" />
            </a>
          )}
          {media?.linkedin && (
            <a href={media.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#fe8903] hover:-translate-y-0.5">
              <Image src={linkedinIcon} alt="LinkedIn" width={20} height={20} className="transition-filter duration-300 ease-in-out hover:brightness-0 hover:invert" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
};

// Blog Card Component
export const BlogCard = ({ 
  title, 
  date, 
  blogText, 
  imageUrl, 
  Slug, 
  className = "" 
}: BlogCardProps) => {
  const router = useRouter();

  // Build a plain-text preview from the first summary (strip HTML tags)
  const rawHtml = blogText?.[0]?.summarys?.[0]?.summary || "";
  const textOnly = rawHtml.replace(/<[^>]+>/g, "");
  const previewText = textOnly.length > 200 ? textOnly.slice(0, 200) + "..." : textOnly;

  const handleClick = () => {
    router.push(`/blog/${Slug}`);
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`w-full rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1 bg-white ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open blog ${title}`}
    >
      <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-6">
        {/* Left image */}
        <div className="w-full md:w-5/12 lg:w-4/12 rounded-lg overflow-hidden flex-shrink-0">
          <div className="relative h-44 md:h-40 lg:h-48 w-full overflow-hidden">
            <Image
              src={imageUrl || "/assests/images/NOData.jpg"}
              alt={title}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 41.67vw, 33.33vw"
              onError={(e: any) => { e.currentTarget.src = "/assests/images/NOData.jpg"; }}
            />
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative py-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl border border-gray-200/30">
                <Image src={avatarIcom} alt="Author" width={18} height={18} />
                <p className="text-sm">Amit</p>
              </div>
            </div>

            <div className="text-sm text-orange-500 flex items-center gap-2">
              <Image src={watchIcom} alt="Date" width={14} height={14} />
              <span>{date}</span>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mt-3 mb-2 text-gray-900 hover:text-[#fe8903] transition-colors duration-200">{title}</h3>

          <p className="text-sm text-gray-600 line-clamp-4">
            {previewText || "No description available."}
          </p>

          {/* Circular arrow button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
            aria-label={`Read more about ${title}`}
            className="absolute right-4 bottom-4 w-10 h-10 bg-slate-300/60 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors duration-200 outline-none focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2"
          >
            <Image src={UPRightArrow} alt="Read more" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Drop Box Component
export const DropBox = ({ 
  setDropVal, 
  list, 
  defaultVal, 
  width, 
  className = "" 
}: DropProps) => (
  <select
    style={{ width: width || "100%" }}
    className={`min-h-11 border border-gray-500 rounded-1.25 px-5 pr-10 cursor-pointer bg-white/10 appearance-none bg-no-repeat bg-right-3.75 bg-center bg-6.25 text-base text-gray-600 transition-colors duration-300 ease-in-out focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2 focus:border-[#fe8903] hover:border-[#fe8903] ${className}`}
    onChange={(e) => setDropVal(e.target.value)}
    aria-label={defaultVal}
  >
    <option>{defaultVal}</option>
    {list?.map((el, i) => (
      <option key={i}>{String(el)}</option>
    ))}
  </select>
);

// Reloader utility function
export const Reloader = (delay: number = 1000) => {
  setTimeout(() => {
    window.location.reload();
  }, delay);
};

// Job Card Component
interface JobCardProps {
  _id?: string;
  title: string;
  description: string;
  location: string;
  experience: string;
  salary: string;
  type: string;
  skills?: string[];
  postedDate?: number;
  jobLocation?: string;
  className?: string;
}

// removed duplicate import of parse; already imported at top

// Helper function to format posted date
const formatPostedDate = (timestamp?: number): string => {
  if (!timestamp) return "";
  
  const postedDate = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Posted today";
  if (diffDays === 1) return "Posted yesterday";
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Posted ${months} ${months === 1 ? "month" : "months"} ago`;
  }
  return `Posted ${postedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
};

export const JobCard = ({ 
  _id,
  title, 
  description, 
  location,
  experience,
  salary,
  type,
  skills,
  postedDate,
  jobLocation,
  className = "" 
}: JobCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (_id) {
      router.push(`/careerDetail/${_id}`);
    }
  };

  return (
    <div className={`w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`} onClick={handleClick}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="text-gray-600 mb-4 max-h-20 overflow-hidden">{description ? parse(description) : null}</div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Image src={locationIcon} alt="Location" width={16} height={16} />
            <span className="text-sm text-gray-600">{location}</span>
            {jobLocation && (
              <>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{jobLocation}</span>
              </>
            )}
          </div>
          <div className="flex items-start gap-2">
            <Image src={watchYIcom} alt="Experience" width={16} height={16} className="mt-0.5" />
            <div className="text-sm text-gray-600 max-h-20 overflow-hidden flex-1">{experience ? parse(experience) : null}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-green-600">{salary}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">{type}</span>
          </div>
          {postedDate && (
            <div className="flex items-center gap-2">
              <Image src={watchIcom} alt="Posted Date" width={16} height={16} />
              <span className="text-sm text-gray-600">{formatPostedDate(postedDate)}</span>
            </div>
          )}
        </div>
        
        {skills && skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <AppBtn
            btnText="Apply Now"
            icon={blackArrowIcon}
            width="120px"
            height="40px"
          />
        </div>
      </div>
    </div>
  );
};

// Features Card Component
export const FeaturesCard = ({ title, summary, className = "" }: FeaturesProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Image src={featuresIcon} alt="Feature" width={40} height={40} className="mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="w-full h-px bg-gray-200 mb-3"></div>
      <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
    </div>
  );
};

// Benefits Card Component
export const BenefitsCard = ({ title, summary, index, className = "" }: BenefitsProps) => {
  return (
    <div className={`bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow duration-300 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {index + 1}. {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
    </div>
  );
};

// GoTop component
interface GoTopProps {
  className?: string;
}

export const GoTop: React.FC<GoTopProps> = ({ className = "" }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`fixed bottom-5 right-5 w-12.5 h-12.5 bg-[#fe8903] text-white border-none rounded-full cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(254,137,3,0.3)] transition-all duration-300 ease-in-out z-1000 hover:bg-[#e67e00] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(254,137,3,0.4)] focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2 ${className}`}
      onClick={scrollToTop}
      type="button"
      aria-label="Go to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 12H8V22H16V12H22L12 2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
