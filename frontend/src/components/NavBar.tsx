"use client";

import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { AppBtn } from "@/components/Button";
import { setLabel } from "@/store/slices/stateSlice";
import { FetchService } from "@/store/slices/serviceSlice";
import { FetchCategory } from "@/store/slices/categorySlice";
import { FetchBlog } from "@/store/slices/blogSlice";
import { AuthContext } from "@/Util/context/AuthContext";
import { MainCategoryList, BlogCategoryList } from "@/assests/Data/page";
import type { RootState, AppDispatch } from "@/store/slices/store";


const ClogoImg = "/assests/images/logo.svg";
const homeIcon = "/assests/images/homeIcon.svg";
const serviceIcon = "/assests/images/serviceIcon.png";
const aboutUsIcon = "/assests/images/aboutUsIcon.svg";
const blogIcon = "/assests/images/blogIcon.png";
const contaceUsIcon = "/assests/images/contact-us.png";
const rightArrow = "/assests/images/rightArrow.svg";
const rightArrowV2 = "/assests/images/rightArrowV2.png";
const searchIcon = "/assests/images/SearchIcon.svg";
const avatarIcon = "/assests/images/avatarIcon.png";
const menuIcon = "/assests/images/menuIcon.png";
const backRoundArrow = "/assests/images/backRoundArrow.png";
const homeBg = "/assests/images/homeBg.svg";

interface NavProps {
  currentNav: string;
  setCurrentNav: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavBar({ currentNav }: NavProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  //Data fetch---
  const Service = useSelector((state: RootState) => state.service);
  const Category = useSelector((state: RootState) => state.category);
  const Blog = useSelector((state: RootState) => state.blog);

  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const { user } = useContext(AuthContext)!;
  const [userDrop, setUserDrop] = useState(false);
  const [categoryPop, setCategoryPop] = useState<boolean>(false);
  const [categoryIndex, setCategoryIndex] = useState<number>();
  const [blogPop, setBlogPop] = useState<boolean>(false);
  const [blogPopIndex, setBlogPopIndex] = useState<number>();

  const label = useSelector((state: RootState) => state.label.value);
  //state
  const [searchTerm, setSearchTerm] = useState("");

  //Search function
  const filteredProducts = Service.data?.filter((product) => {
    const lowerCaseTitle = product?.title?.toLowerCase();
    const lowerCaseInput = searchTerm?.toLowerCase();
    if (searchTerm === "") return false;
    if (lowerCaseTitle === lowerCaseInput) return true;
    return lowerCaseTitle.includes(lowerCaseInput);
  });

  const closeNav = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "grayBox" || target.closest('#grayBox')) {
      setNav(false);
    }
  };

  interface navItemType {
    title: string;
    url: string;
    icon: string;
  }

  const NavItem: navItemType[] = [
    {
      title: "Home",
      url: "/",
      icon: homeIcon,
    },
    {
      title: "Our Services",
      url: "/our-services",
      icon: serviceIcon,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: serviceIcon,
    },
    {
      title: "About Us",
      url: "/about",
      icon: aboutUsIcon,
    },
    {
      title: "Guide",
      url: "/blog",
      icon: blogIcon,
    },
    {
      title: "Contact Us",
      url: "/contact-us",
      icon: contaceUsIcon,
    },
  ];

  const navigatePage = (url: string) => {
    router.push(url);
    setNav(false);
   
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMobileMenuClick = () => {
    console.log('Mobile menu clicked, current nav state:', nav);
    setNav(true);
  };

  //Log out
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      setNav(true);
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      setNav(false);
    }
  }, [nav]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } 
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  // Scroll-aware navbar: toggle solid background & shadow after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      // threshold can be adjusted
      setScrolled(y > 20);
    };

    // init
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderCategorylist = ({
    category,
    index,
  }: {
    category: string;
    index: number;
  }) => {
    const filterData = Category.data?.filter(
      (val) => val.category === category
    );
    
    // Define service links for each category
    const getServiceLinks = (categoryTitle: string) => {
      switch (categoryTitle) {
        case "Income Tax Services":
          return [
            { title: "ITR Filing", url: "/services/itr-filing" },
            { title: "Notice", url: "/our-services/notice" },
            { title: "TDS Return Filing", url: "/services/tds-return-filing" }
          ];
        case "Goods and Services Tax (GST)":
          return [
            { title: "GST Annual Return", url: "/services/gst-annual-return" },
            { title: "GST Registration", url: "/services/gst-registration" },
            { title: "GST Return", url: "/services/gst-return" },
            { title: "LUT Filing", url: "/services/lut-filing" },
            { title: "GST Notice", url: "/services/gst-notice" }
          ];
        case "Startup Services":
          return [
            { title: "Individual Startup", url: "/services/individual-startup" },
            { title: "Non-Individual Startup", url: "/services/non-individual-startup" }
          ];
        case "Compliance Services":
          return [
            { title: "HR Compliance", url: "/services/hr-compliance" },
            { title: "Individual Small Business", url: "/services/individual-small-business" },
            { title: "Non-Individual Small Business", url: "/services/non-individual-small-business" },
            { title: "Other Compliance", url: "/services/other-compliance" }
          ];
        case "Intellectual Property Rights (IPR)":
          return [
            { title: "Trademarks", url: "/services/trademarks" },
            { title: "Copyright", url: "/services/copyright" },
            { title: "Patent", url: "/services/patent" }
          ];
        case "Accounting":
          return [
            { title: "Bookkeeping", url: "/services/bookkeeping" },
            { title: "Report", url: "/services/report" }
          ];
        default:
          return [];
      }
    };

    const serviceLinks = getServiceLinks(category);
    
    if (filterData.length > 0 || serviceLinks.length > 0) {
      return (
        <>
          <div
            style={{ display: categoryIndex === index ? "flex" : "none" }}
            className="absolute left-full top-0 w-60 flex-col rounded-lg overflow-hidden border border-gray-300/22 z-[99999] bg-white"
          >
            {/* Dynamic services from Redux */}
            {filterData?.map((el: any, i: number) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/category/${el?.Slug}`);
                  setCategoryPop(false); // Close dropdown after navigation
                }}
                key={i}
                className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm text-orange-500">{el?.title}</span>
              </div>
            ))}
            
            {/* Static service links */}
            {serviceLinks.map((service, i) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(service.url);
                  setCategoryPop(false); // Close dropdown after navigation
                }}
                key={`static-${i}`}
                className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm text-orange-500">{service.title}</span>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  const renderBloglist = ({
    category,
    index,
  }: {
    category: string;
    index: number;
  }) => {
    const filterData = Blog?.data?.filter((val) => val.category === category);
    
    // Define guide links for each category based on the images
    const getGuideLinks = (categoryTitle: string) => {
      switch (categoryTitle) {
        case "Income Tax":
          return [
            { title: "Blog title tow", url: "/blog/blog-title-tow" },
            { title: "Blog title tow", url: "/blog/blog-title-tow" },
            { title: "Test blog titlev", url: "/blog/test-blog-titlev" }
          ];
        case "Updates":
          return [
            { title: "Urban Oasis in South Delhi", url: "/blog/urban-oasis-south-delhi" },
            { title: "TexQue new blog title", url: "/blog/texque-new-blog-title" },
            { title: "Cepeelispee", url: "/blog/cepeelispee" }
          ];
        case "Private Company":
          return [
            { title: "Private Company Guide", url: "/blog/private-company-guide" },
            { title: "Company Formation", url: "/blog/company-formation" },
            { title: "Corporate Compliance", url: "/blog/corporate-compliance" }
          ];
        case "ROC Filings":
          return [
            { title: "ROC Filing Process", url: "/blog/roc-filing-process" },
            { title: "Annual Returns", url: "/blog/annual-returns" },
            { title: "Compliance Calendar", url: "/blog/compliance-calendar" }
          ];
        case "Compliance":
          return [
            { title: "Statutory Compliance", url: "/blog/statutory-compliance" },
            { title: "Regulatory Updates", url: "/blog/regulatory-updates" },
            { title: "Legal Requirements", url: "/blog/legal-requirements" }
          ];
        case "Business":
          return [
            { title: "Business Setup Guide", url: "/blog/business-setup-guide" },
            { title: "Startup Registration", url: "/blog/startup-registration" },
            { title: "Business Growth", url: "/blog/business-growth" }
          ];
        case "Registration":
          return [
            { title: "Company Registration", url: "/blog/company-registration" },
            { title: "LLP Registration", url: "/blog/llp-registration" },
            { title: "Partnership Registration", url: "/blog/partnership-registration" }
          ];
        case "Accounting & Bookkeeping":
          return [
            { title: "Bookkeeping Basics", url: "/blog/bookkeeping-basics" },
            { title: "Accounting Standards", url: "/blog/accounting-standards" },
            { title: "Financial Reporting", url: "/blog/financial-reporting" }
          ];
        case "Trademark":
          return [
            { title: "Trademark Registration", url: "/blog/trademark-registration" },
            { title: "Trademark Search", url: "/blog/trademark-search" },
            { title: "Trademark Renewal", url: "/blog/trademark-renewal" }
          ];
        case "Copyright":
          return [
            { title: "Copyright Registration", url: "/blog/copyright-registration" },
            { title: "Copyright Protection", url: "/blog/copyright-protection" },
            { title: "Copyright Infringement", url: "/blog/copyright-infringement" }
          ];
        case "Import & Export":
          return [
            { title: "Import Documentation", url: "/blog/import-documentation" },
            { title: "Export Procedures", url: "/blog/export-procedures" },
            { title: "Customs Compliance", url: "/blog/customs-compliance" }
          ];
        case "Tools":
          return [
            { title: "Tax Calculator", url: "/blog/tax-calculator" },
            { title: "GST Calculator", url: "/blog/gst-calculator" },
            { title: "Business Tools", url: "/blog/business-tools" }
          ];
        default:
          return [];
      }
    };

    const guideLinks = getGuideLinks(category);
    
    if (filterData.length > 0 || guideLinks.length > 0) {
      return (
        <>
          <div
            style={{ display: blogPopIndex === index ? "flex" : "none" }}
            className="absolute left-full top-0 w-60 flex-col rounded-lg overflow-hidden border border-gray-300/22 z-[99999] bg-white"
          >
            {/* Dynamic blog posts from Redux */}
            {filterData?.map((el: any, i: number) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/learn/${el?.Slug}`);
                  setBlogPop(false); // Close dropdown after navigation
                }}
                key={i}
                className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm text-orange-500">{el?.title}</span>
              </div>
            ))}
            
            {/* Static guide links */}
            {guideLinks.map((guide, i) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(guide.url);
                  setBlogPop(false); // Close dropdown after navigation
                }}
                key={`guide-${i}`}
                className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-sm text-orange-500">{guide.title}</span>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    // Only fetch if data is not already loaded
    if (!Service?.data?.length) {
      dispatch(FetchService());
    }
    if (!Category?.data?.length) {
      dispatch(FetchCategory());
    }
    if (!Blog?.data?.length) {
      dispatch(FetchBlog());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const GoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={divRef}
        className={`w-full h-[80px] sm:h-[90px] md:h-[100px] flex flex-row items-center justify-between px-[3%] sm:px-[2%] fixed top-0 left-0 z-[9999] md:px-[9%] lg:px-[9%] transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'}`}
      >
        {/* Background Image */}
  <div className={`absolute inset-0 w-full h-full opacity-40 ${scrolled ? 'hidden' : 'block'}`}>
          <Image
            src={homeBg}
            alt="Background"
            fill
            className="object-cover w-full h-full"
            priority={false}
            style={{
              objectPosition: 'center top',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
        {/*Search pop */}
        <div
          id="searchGrayBox"
          style={{ width: label ? "100%" : "0%", display: label ? "flex" : "none" }}
          className="h-screen bg-gray-300/30 backdrop-blur-sm absolute top-0 left-0 transition-all duration-600 flex justify-center items-start z-99 overflow-hidden pt-32"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.id === "searchGrayBox") {
              dispatch(setLabel(false));
            }
          }}
        >
          
          <div className="w-95 h-fit p-6 sm:p-8 md:p-10 bg-gray-100 flex flex-col items-center rounded-3xl sm:rounded-5xl shadow-xl md:w-[500px] lg:w-[600px]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6">Search Service</h2>
            <div className="w-full h-10 sm:h-12 md:h-14 bg-orange-200/21 p-2 sm:p-2.5 rounded-lg mb-4 sm:mb-5 md:mb-6">
              <input
                type="text"
                placeholder="Search Categorys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full border-none pl-3 sm:pl-4 md:pl-5 focus:outline-none bg-transparent text-sm sm:text-base text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="w-full flex flex-col gap-2 sm:gap-3 max-h-48 sm:max-h-56 md:max-h-60 overflow-y-auto">
              {filteredProducts?.map((val: any, i: number) => (
                <div
                  onClick={() => {
                    router.push(`/services/${val?.Slug}`);
                    dispatch(setLabel(false));
                    setSearchTerm("");
                  }}
                  key={i}
                  className="w-full p-2 sm:p-3 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-900 block">{val.title}</span>
                  <span className="text-xs text-gray-600">{val?.category?.title}</span>
                </div>
              ))}
              {searchTerm && filteredProducts?.length === 0 && (
                <div className="w-full p-3 text-center text-gray-500 text-sm">
                  No services found for "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-[80px] sm:w-[100px] md:w-[150px] lg:w-[200px] flex items-center relative z-10" onClick={() => router.push("/")}>
          <Image src={ClogoImg} alt="TaxQue Logo" width={200} height={60} className="w-full cursor-pointer" />
        </div>
        <ToastContainer />

    
        <div
          id="grayBox"
          style={{ 
            width: nav ? "100%" : "0%", 
            opacity: nav ? 1 : 0,
            visibility: nav ? "visible" : "hidden"
          }}
          className="h-screen bg-gray-300/30 absolute top-0 left-0 transition-all duration-300 ease-in-out flex justify-start z-[9999] overflow-hidden touch-manipulation"
          onClick={closeNav}
        >
          <div 
            className={`w-full h-full flex flex-col items-start pl-5 sm:pl-6 md:pl-7 gap-3 sm:gap-4 pt-8 sm:pt-10 md:pt-11 bg-[#0D203B] overflow-hidden relative transform transition-transform duration-300 ease-in-out touch-manipulation ${nav ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {NavItem?.map((el, i) => (
              <div
                key={i}
                className="flex flex-row gap-2 sm:gap-2.5 items-center cursor-pointer hover:bg-gray-800/20 p-3 rounded-lg transition-all duration-300 w-full"
                onClick={() => navigatePage(el?.url)}
              >
                <Image src={el?.icon} alt={el.title} width={32} height={32} className="sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]" />
                <span className="text-lg sm:text-xl md:text-xl text-orange-500 font-medium">{el.title}</span>
              </div>
            ))}
            
           
            {!user && (
              <div
                className="flex flex-row gap-2 sm:gap-2.5 items-center cursor-pointer hover:bg-gray-800/20 p-2 rounded-lg transition-colors duration-300"
                onClick={() => navigatePage("/login")}
              >
                <Image src={avatarIcon} alt="Login" width={32} height={32} className="sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]" />
                <span className="text-lg sm:text-xl md:text-xl text-orange-500 font-medium">Log In</span>
              </div>
            )}
            
            <div 
              className="absolute top-32 sm:top-36 md:top-40 -right-3 sm:-right-4 w-10 sm:w-12 cursor-pointer hover:bg-gray-800/20 rounded-full p-1 transition-colors duration-200" 
              onClick={() => setNav(false)}
            >
              <Image
                src={backRoundArrow}
                alt="Back"
                width={40}
                height={40}
                className="sm:w-[45px] sm:h-[45px] md:w-[51px] md:h-[51px]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-[30px] relative z-10">
          <div className="flex flex-row gap-[30px] items-center">
         

          <div
            className={`hidden text-black font-poppins text-lg cursor-pointer relative transition-all duration-300 hover:text-orange-500 ${currentNav === "Home" ? "text-orange-500" : ""} lg:block`}
            onClick={() => navigatePage("/")}
          >
            Home
            <span className={`w-full h-0.5 bg-orange-500 absolute -bottom-1 left-0 ${currentNav === "Home" ? "block" : "hidden"} hover:block`}></span>
            <span className={`w-20 h-0.5 bg-orange-500 absolute -bottom-2.5 left-0 ${currentNav === "Home" ? "block" : "hidden"} hover:block`}></span>
          </div>

          <div
            id="ServicesItem"
            className={`hidden text-black font-poppins text-lg cursor-pointer relative transition-all duration-300 hover:text-orange-500 ${currentNav === "Services" ? "text-orange-500" : ""} lg:block`}
            onMouseOver={(e) => {
              if (e.currentTarget.id === "ServicesItem") {
                setCategoryPop(true);
              }
            }}
            onMouseOut={(e) => {
              if (e.currentTarget.id === "ServicesItem") {
                setCategoryPop(false);
              }
            }}
            onClick={() => {
              navigatePage("/our-services");
            }}
          >
            Our Services
            <span className={`w-full h-0.5 bg-orange-500 absolute -bottom-1 left-0 ${currentNav === "Services" ? "block" : "hidden"} hover:block`}></span>
            <span className={`w-20 h-0.5 bg-orange-500 absolute -bottom-2.5 left-0 ${currentNav === "Services" ? "block" : "hidden"} hover:block`}></span>
            <div
              id="ServicesPop"
              style={{ display: categoryPop ? "flex" : "none" }}
              className="absolute top-[33px] left-[-200%] w-[45vw] bg-white rounded-[30px] shadow-lg z-[99999] p-[10px] flex-row flex-wrap"
              onMouseOver={(e) => {
                if (e.currentTarget.id === "ServicesPop") {
                  setCategoryPop(true);
                }
              }}
              onMouseOut={(e) => {
                if (e.currentTarget.id === "ServicesPop") {
                  setCategoryPop(false);
                }
              }}
            >
              {MainCategoryList?.map((subM, i) => (
                <div
                  className="w-[30%] min-h-[40px] flex flex-row justify-between items-center py-[5px] px-[10px] rounded-[8px] relative hover:bg-gray-200/20"
                  key={i}
                  onMouseOver={() => {
                    setCategoryIndex(i);
                  }}
                  onMouseOut={() => {
                    // Don't immediately close when mouse leaves category
                    // Let the main dropdown handle closing
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Keep dropdown open when clicking on category
                    setCategoryIndex(i);
                  }}
                >
                  <span className="text-[14px] text-black">{subM?.title}</span>
                  <Image src={rightArrowV2} alt="" width={14} height={14} />
                  {renderCategorylist({ category: subM?.title, index: i })}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`hidden text-black font-poppins text-lg cursor-pointer relative transition-all duration-300 hover:text-orange-500 ${currentNav === "About Us" ? "text-orange-500" : ""} lg:block`}
            onClick={() => navigatePage("/about")}
          >
            About Us
            <span className={`w-full h-0.5 bg-orange-500 absolute -bottom-1 left-0 ${currentNav === "About Us" ? "block" : "hidden"} hover:block`}></span>
            <span className={`w-20 h-0.5 bg-orange-500 absolute -bottom-2.5 left-0 ${currentNav === "About Us" ? "block" : "hidden"} hover:block`}></span>
          </div>

          <div
            id="BlogItem"
            className={`hidden text-black font-poppins text-lg cursor-pointer relative transition-all duration-300 hover:text-orange-500 ${currentNav === "Guide" ? "text-orange-500" : ""} lg:block`}
            onMouseOver={(e) => {
              if (e.currentTarget.id === "BlogItem") {
                setBlogPop(true);
              }
            }}
            onMouseOut={(e) => {
              if (e.currentTarget.id === "BlogItem") {
                setBlogPop(false);
              }
            }}
            onClick={() => {
              navigatePage("/blog");
            }}
          >
            Guide
            <span className={`w-full h-0.5 bg-orange-500 absolute -bottom-1 left-0 ${currentNav === "Guide" ? "block" : "hidden"} hover:block`}></span>
            <span className={`w-20 h-0.5 bg-orange-500 absolute -bottom-2.5 left-0 ${currentNav === "Guide" ? "block" : "hidden"} hover:block`}></span>
            <div
              id="blogPop"
              style={{ display: blogPop ? "flex" : "none" }}
              className="absolute top-[33px] left-[-26vw] w-[45vw] bg-white rounded-[30px] shadow-lg z-[99999] p-[10px] flex-row flex-wrap"
              onMouseOver={(e) => {
                if (e.currentTarget.id === "blogPop") {
                  setBlogPop(true);
                }
              }}
              onMouseOut={(e) => {
                if (e.currentTarget.id === "blogPop") {
                  setBlogPop(false);
                }
              }}
            >
              {BlogCategoryList?.map((bol, i) => (
                <div
                  className="w-[30%] min-h-[40px] flex flex-row justify-between items-center py-[5px] px-[10px] rounded-[8px] relative hover:bg-gray-200/20"
                  key={i}
                  onMouseOver={() => {
                    setBlogPopIndex(i);
                  }}
                  onMouseOut={() => {
                    // Don't immediately close when mouse leaves category
                    // Let the main dropdown handle closing
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Keep dropdown open when clicking on category
                    setBlogPopIndex(i);
                  }}
                >
                  <span className="text-[14px] text-black">{bol}</span>
                  <Image src={rightArrowV2} alt="" width={14} height={14} />
                  {renderBloglist({ category: bol, index: i })}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`hidden text-black font-poppins text-lg cursor-pointer relative transition-all duration-300 hover:text-orange-500 ${currentNav === "Contact Us" ? "text-orange-500" : ""} lg:block`}
            onClick={() => navigatePage("/contact-us")}
          >
            Contact Us
            <span className={`w-full h-0.5 bg-orange-500 absolute -bottom-1 left-0 ${currentNav === "Contact Us" ? "block" : "hidden"} hover:block`}></span>
            <span className={`w-20 h-0.5 bg-orange-500 absolute -bottom-2.5 left-0 ${currentNav === "Contact Us" ? "block" : "hidden"} hover:block`}></span>
          </div>

            <div className="cursor-pointer" onClick={() => dispatch(setLabel(true))}>
              <Image
                src={searchIcon}
                alt="Search"
                width={24}
                height={24}
              />
            </div>

            {user ? (
              <div
                className="relative cursor-pointer"
                onClick={() => setUserDrop(!userDrop)}
              >
                <Image src={avatarIcon} alt="User Profile" width={24} height={24} />
                <div
                  style={{ display: userDrop ? "flex" : "none" }}
                  className="absolute top-12 rounded-lg overflow-hidden flex-col border border-gray-300/22 z-10"
                >
                  <div
                    className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push("/user-profile")}
                  >
                    <span className="text-sm">Profile</span>
                  </div>
                  <div className="w-full h-7 px-2.5 border-b border-gray-300 bg-white transition-all duration-600 cursor-pointer hover:bg-gray-50" onClick={handleLogOut}>
                    <span className="text-sm">LogOut</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
               
                <button
                  onClick={() => router.push("/login")}
                  className="hidden md:flex bg-[#0d203b] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a2f4a] transition-colors duration-300 items-center gap-2 cursor-pointer"
                >
                  Log In
                  <Image src={rightArrow} alt="Arrow" width={16} height={16} className="filter brightness-0 invert" />
                </button>
                
             
                <button
                  onClick={() => router.push("/login")}
                  className="hidden sm:flex md:hidden bg-[#0d203b] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#1a2f4a] transition-colors duration-300 items-center gap-2 cursor-pointer"
                >
                  <Image
                    src={avatarIcon}
                    alt="Login"
                    width={18}
                    height={18}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-sm">Login</span>
                </button>
             
                <button
                  onClick={() => router.push("/login")}
                  className="sm:hidden bg-[#0d203b] text-white px-2 py-1.5 rounded-lg font-medium hover:bg-[#1a2f4a] transition-colors duration-300 items-center gap-1 cursor-pointer flex"
                >
                  <Image
                    src={avatarIcon}
                    alt="Login"
                    width={16}
                    height={16}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-xs">Login</span>
                </button>
              </>
            )}

            <div 
              className="w-8 sm:w-10 md:w-12 lg:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95 touch-manipulation" 
              onClick={handleMobileMenuClick}
            >
              <Image
                src={menuIcon}
                alt="Menu"
                width={32}
                height={32}
                className="sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]"
              />
            </div>
          </div>
        </div>

        <div
          style={{ display: isVisible ? "none" : "block" }}
          className="fixed bottom-1.5 right-5 w-12 cursor-pointer z-9999 md:w-16 md:right-3"
          onClick={GoTop}
        >
          <Image
            src="https://img.icons8.com/carbon-copy/100/fe8903/circled-up.png"
            alt="goTop img"
            width={100}
            height={100}
          />
        </div>
      </div>

    </>
  );
}
