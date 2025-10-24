"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MainCategoryList } from "@/assests/Data/page";

const homeBg = "/assests/images/homeBg.svg";
const rightArrow = "/assests/images/rightArrow.svg";
const heroImg = "/assests/images/homeBGframe.svg";
const GRatingImg = "/assests/images/GRatingImg.svg";
const Reffer = "/assests/images/refferlIcon.png";
const taxImg = "/assests/images/taxImg.svg";
const GreenBg = "/assests/images/GreenBg.svg";
const taxQueImg = "/assests/images/TaxQueImg.png";



import NavBar from "@/components/NavBar"; 
import Footer from "@/components/Footer";
import MyCarousel from "@/components/Carousel";
import Subscribe from "@/components/Subscribe";
import BNCarousel from "@/components/CBannerCarousel";
import WCTQCarousel from "@/components/WCTQCarousel";
import SuccessStories from "@/components/SuccessStories";
import PriceSection from "@/components/PriceSection";
import HomeCarousel from "@/components/HomeCarousel";
import { AppBtn } from "@/components/Button";
import { GoTop } from "@/components/Tools";
import ContactSection from "@/components/ContactSection";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { setValue } from "@/store/slices/homeCategorySlice";

interface HomePageProps {
  className?: string;
}

const Home = ({ className }: HomePageProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.category);
  const Service = useSelector((state: RootState) => state.service);
  const [currentDisplayPrice, setCurrentDisplayPrice] = useState<string>();
  const [contactPop, setContactPop] = useState<boolean>(false);
  const [currentNav, setCurrentNav] = useState<string>("Home");
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

  // Close contact popup here
  const CloseCPop = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "grayBox") {
      setContactPop(false);
    }
  };


  const displyaPricePlane = Service.data?.find(
    (val: any) => val.display === currentDisplayPrice
  );

  
  useEffect(() => {
    const currentDate = new Date();
    if (Service.data && Service.data.length) {
      const dateListObject = Service.data
        .filter((pd: any) => pd?.display)
        .map((pd: any) => new Date(pd.display as string));
      const pastDates = dateListObject.filter(
        (olddate: any) => olddate <= currentDate
      );

      const latestDate = pastDates.reduce((latest: any, dt: any) => {
        return dt > latest ? dt : latest;
      }, new Date(0));

      setCurrentDisplayPrice(latestDate.toISOString());
    }
  }, [Service.data]);

  // Hero Header Component here
  function HeroHeader() {
    const [currentWord, setCurrentWord] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const words = ["TaxQue - Simplifying Taxes for You!", "TaxQue - Simplifying Taxes for Businesses!", "TaxQue - Simplifying Taxes for Individuals!", "TaxQue - Simplifying Taxes for Everyone!"];
    
    useEffect(() => {
      const current = words[currentWord];
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      }, isDeleting ? 50 : 100);
      
      return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentWord, words]);

    return (
      <div className="w-[80%] text-center sm:w-auto sm:text-left relative z-10">
        <h1 className="text-[20px] font-bold text-black sm:text-[45px] lg:text-[45px] drop-shadow-sm"> Welcome to </h1>
        <h2 className="text-[20px] font-bold mt-1 text-black sm:text-[35px] lg:text-[35px] drop-shadow-sm">
          <span className="text-black font-bold">{displayText}</span>
          <span className="text-black animate-pulse">|</span>
        </h2>
      </div>
    );
  }

  useEffect(() => {
    if (contactPop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [contactPop]);

  
  useEffect(() => {
    const checkSliderState = () => {
     
      const searchPopup = document.getElementById('searchGrayBox');
      const isSearchOpen = searchPopup && searchPopup.style.display !== 'none' && searchPopup.style.width === '100%';
      
   
      const mobileNav = document.getElementById('grayBox');
      const isMobileNavOpen = mobileNav && mobileNav.style.width === '100%';
      
    
      const contactPopup = document.getElementById('grayBox');
      const isContactOpen = contactPopup && contactPopup.style.width === '100%';
      
      setIsSliderOpen(!!(isSearchOpen || isMobileNavOpen || isContactOpen || contactPop));
    };

  
    checkSliderState();
    
    
    const interval = setInterval(checkSliderState, 100);
    
    return () => clearInterval(interval);
  }, [contactPop]);


  return (
    <>
      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="w-full min-h-screen bg-white text-black relative">
      {/* Contact Popup here */}
      <div
        style={{ width: contactPop ? "100%" : "0%" }}
        className="fixed top-0 left-0 h-screen bg-black/50 z-9999 flex items-center justify-center transition-all duration-300 ease-in-out"
        id="grayBox"
        onClick={CloseCPop}
      >
        <div className="w-95 bg-green-100 rounded-5xl h-fit max-h-90vh overflow-y-auto md:w-3/4 lg:w-2/5">
          <ContactSection icon={true} subjectList={data} section="Home" />
        </div>
      </div>

     
      <div className="w-full min-h-[820px] flex justify-center flex-col relative text-black z-10 sm:min-h-[1000px] lg:h-screen lg:min-h-0">
        {/* Hero Background Image - Hidden when slider is open */}
        <div className={`absolute inset-0 w-full h-full z-[-1] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0' : 'opacity-100'}`}>
          <Image 
            src={homeBg} 
            alt="Hero Background" 
            fill 
            priority 
            className="object-cover object-right w-full h-full"
            sizes="100vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent sm:from-white/80 sm:via-white/60"></div>
        </div>
        
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />

        <div className={`w-full px-[2%] flex flex-col-reverse gap-5 justify-between items-center mt-[20%] sm:px-[4%] sm:gap-5 sm:mt-[11%] lg:px-[9%] lg:min-h-[455px] lg:flex-row lg:gap-[30px] lg:items-start lg:mt-0 transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          <div className="w-full flex flex-col gap-5 items-center text-black sm:items-start lg:w-[68%] relative z-10">
              <HeroHeader />
            <p className="text-base text-[#4d4d4d] text-center leading-relaxed sm:text-left sm:text-lg lg:text-xl font-medium">
                Simplifying finances since 2019, TaxQue is the trusted choice for
                businesses and individuals in need of expert taxation and
                compliance services. Our mission is to deliver solutions that are
                accurate, timely, and hassle-free.
              </p>
              <AppBtn
                btnText="Get An Appointment"
                icon={rightArrow}
                width="280px"
                height="50px"
                className="sm:w-[300px] sm:h-[60px]"
                onClick={() => {
                  setContactPop(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            <div className="flex flex-col items-center gap-4 mt-5 sm:gap-5 sm:items-start">
                <div className="mt-2 sm:mt-3">
                  <Image src={GRatingImg} alt="Google Rating" width={160} height={48} className="sm:w-[180px] sm:h-[54px] md:w-[200px] md:h-[60px]" />
                </div>
                <p
                  className="flex items-center gap-2 cursor-pointer text-[#fe8903] font-semibold text-sm transition-colors duration-300 ease-in-out hover:text-[#e67e00] sm:text-base"
                  onClick={() => {
                    router.push("/reffer");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image src={Reffer} alt="Refer Icon" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                  Refer And Earn
                </p>
              </div>
            </div>

          
          <div className="w-[90%] flex justify-center relative items-center sm:w-[60%] lg:w-[40%] min-h-[300px]">
            
            <Image 
              src={heroImg} 
              className="absolute inset-0 w-full h-full z-[1] object-contain" 
              alt="Hero Frame Background" 
              fill 
              priority
            />
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[230px] h-[230px] z-[2] flex items-center justify-center sm:w-[230px] sm:h-[230px] md:w-[230px] md:h-[230px] lg:w-[230px] lg:h-[230px]">
                <HomeCarousel />
            </div>
          </div>
        </div>
      </div>

    
      <div className={`w-full h-[120px] bg-[#0d203b] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <BNCarousel />
      </div>

      
      <div className={`w-full flex flex-col items-center bg-white pt-[20px] pb-[30px] px-[4%] text-black sm:pt-[30px] sm:pb-[40px] sm:px-[6%] md:pt-[40px] md:pb-[50px] md:px-[8%] lg:pt-[50px] lg:pb-[60px] lg:px-[10%] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <p className="w-full text-[16px] text-black font-bold font-[poppinsBold] text-center mb-[20px] sm:text-[18px] sm:mb-[25px] md:text-[22px] md:mb-[30px] lg:text-[28px] lg:mb-[35px] xl:text-[32px]">Our Services</p>
        <div className="w-full flex flex-row justify-center gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:gap-5 lg:p-5">
          <MyCarousel data={MainCategoryList} cardName="mainCategory" autoPlay={true} autoPlaySpeed={3000} />
        </div>
        <div className="mt-[20px] sm:mt-[25px] md:mt-[30px] lg:mt-[35px]">
          <AppBtn
            btnText="More Services"
            width="180px"
            height="45px"
            className="sm:w-[200px] sm:h-[50px] md:w-[220px] md:h-[55px] lg:w-[240px] lg:h-[60px]"
            icon={rightArrow}
            onClick={() => {
              router.push("/our-services");
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch(setValue("categoryPage"));
            }}
          />
        </div>
      </div>

     
      <div className={`w-full px-[5%] flex flex-col justify-between gap-[25px] mb-[6%] relative sm:px-[4%] sm:gap-[30px] sm:mb-[6%] md:px-[4%] md:flex-row md:gap-[30px] md:mb-[6%] lg:px-[9%] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Image className="absolute top-0 left-[15%] w-[50%] sm:left-[18%] sm:w-[45%] md:left-[24%] md:w-[35%] md:top-[23%] lg:top-0" src={GreenBg} alt="Green Background" width={400} height={300} />
        <div className="w-full flex justify-center md:w-[40%] md:block">
          <Image src={taxImg} alt="Tax" width={500} height={400} className="w-[75%] h-full sm:w-[70%] md:w-full" />
        </div>
        <div className="w-full py-4 z-[1] flex items-center flex-col text-black sm:py-5 md:block md:w-[60%] md:py-5">
          <p className="font-[poppinsBold] text-[20px] font-semibold text-black text-center mb-4 sm:text-[22px] sm:mb-5 md:text-[30px] md:text-left md:mb-5 lg:text-[40px]">Our Commitment</p>
          <p className="text-[15px] text-[#4d4d4d] my-[25px] text-center leading-relaxed sm:text-[16px] sm:my-[30px] md:text-[16px] md:text-[#4d4d4d] md:my-[30px] lg:text-[20px] lg:text-[#4d4d4d]">
            Your success is our priority. At TaxQue by ARB Fintech LLP, we are
            committed to building lasting relationships by delivering
            exceptional service with integrity and professionalism. We aim to
            make your experience effortless and rewarding, whether you're filing
            taxes, registering a business, or seeking financial advice.
          </p>
          <p className="text-[15px] text-[#4d4d4d] my-[25px] text-center leading-relaxed sm:text-[16px] sm:my-[30px] md:text-[16px] md:text-[#4d4d4d] md:my-[30px] lg:text-[20px] lg:text-[#4d4d4d]">
            We take pride in simplifying complex processes, allowing you to
            focus on growing your business and achieving your dreams with
            confidence.
          </p>
          <AppBtn
            btnText="Know About Us"
            icon={rightArrow}
            width="220px"
            height="50px"
            className="sm:w-[240px] sm:h-[55px]"
            onClick={() => {
              router.push("/about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

     
      <div className={`w-full h-[280px] relative flex items-center justify-center flex-col bg-transparent sm:h-[320px] md:h-[450px] lg:h-[500px] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Image src={taxQueImg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Tax Que" fill />
        <p className="text-white text-[18px] font-bold font-[poppinsBold] text-center mb-[25px] sm:text-[20px] sm:mb-[30px] md:text-[26px] md:mb-[20px] lg:text-[46px] lg:text-left">Why Choose TaxQue?</p>
        <div className="w-full z-[1] px-3 sm:px-4 md:px-0">
          <WCTQCarousel />
        </div>
      </div>

      
      <div className={`w-full flex flex-col items-center py-[5%] px-[5%] sm:py-[6%] md:py-[6%] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <p className="text-[18px] font-bold font-[poppinsBold] text-center mb-[25px] sm:text-[20px] sm:mb-[30px] md:text-[26px] md:mb-[30px] lg:text-[46px] lg:text-left">Right Plan For Your</p>
      </div>
      
    
      <div className={`transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <SuccessStories />
      </div>
      <div className={`w-full flex flex-col items-center py-[5%] px-[5%] sm:py-[6%] md:py-[6%] transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <p className="text-[18px] font-bold font-[poppinsBold] text-center mb-[25px] sm:text-[20px] sm:mb-[30px] md:text-[26px] md:mb-[30px] lg:text-[46px] lg:text-left">Our Latest News</p>
        
        {/* Blog Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Blog Card 1 */}
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-green-200 hover:-translate-y-2 cursor-pointer group"
            onClick={() => router.push('/blog/blog-title-tow')}
            style={{
              animation: 'slideInFromLeft 0.8s ease-out',
              animationDelay: '0.2s',
              animationFillMode: 'both'
            }}
          >
            {/* Top Section */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assests/images/HPTImg.png"
                    alt="Blog Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300">Blog Title Two</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Latest insights and updates from our team.</p>
                </div>
              </div>
              
              {/* Read More Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/blog/blog-title-tow');
                }}
                className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm"
              >
                Read More
              </button>
            </div>
            
            {/* Bottom Image Section */}
            <div className="h-24 md:h-32 bg-white flex items-center justify-center transition-all duration-300">
              <Image
                src="/assests/images/HPTImg.png"
                alt="Blog Title Two"
                width={200}
                height={80}
                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Blog Card 2 */}
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-green-200 hover:-translate-y-2 cursor-pointer group"
            onClick={() => router.push('/blog/urban-oasis-south-delhi')}
            style={{
              animation: 'slideInFromLeft 0.8s ease-out',
              animationDelay: '0.4s',
              animationFillMode: 'both'
            }}
          >
            {/* Top Section */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assests/images/ROCCardImg.png"
                    alt="Blog Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300">Urban Oasis South Delhi</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Exploring the urban landscape and development.</p>
                </div>
              </div>
              
              {/* Read More Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/blog/urban-oasis-south-delhi');
                }}
                className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm"
              >
                Read More
              </button>
            </div>
            
            {/* Bottom Image Section */}
            <div className="h-24 md:h-32 bg-white flex items-center justify-center transition-all duration-300">
              <Image
                src="/assests/images/ROCCardImg.png"
                alt="Urban Oasis South Delhi"
                width={200}
                height={80}
                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Blog Card 3 */}
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-green-200 hover:-translate-y-2 cursor-pointer group"
            onClick={() => router.push('/blog/deep-dive-cbic-instruction-03-2025-gst')}
            style={{
              animation: 'slideInFromLeft 0.8s ease-out',
              animationDelay: '0.6s',
              animationFillMode: 'both'
            }}
          >
            {/* Top Section */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assests/images/taxImg.svg"
                    alt="Blog Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300">CBIC Instruction 03/2025 GST</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Deep dive into GST regulations and updates.</p>
                </div>
              </div>
              
              {/* Read More Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/blog/deep-dive-cbic-instruction-03-2025-gst');
                }}
                className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm"
              >
                Read More
              </button>
            </div>
            
            {/* Bottom Image Section */}
            <div className="h-24 md:h-32 bg-white flex items-center justify-center transition-all duration-300">
              <Image
                src="/assests/images/taxImg.svg"
                alt="CBIC Instruction GST"
                width={200}
                height={80}
                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Blog Card 4 */}
          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-green-200 hover:-translate-y-2 cursor-pointer group"
            onClick={() => router.push('/blog/test-blog-titlev')}
            style={{
              animation: 'slideInFromLeft 0.8s ease-out',
              animationDelay: '0.8s',
              animationFillMode: 'both'
            }}
          >
            {/* Top Section */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assests/images/oslImg1.png"
                    alt="Blog Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300">Test Blog Title V</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Testing and development insights.</p>
                </div>
              </div>
              
              {/* Read More Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/blog/test-blog-titlev');
                }}
                className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm"
              >
                Read More
              </button>
            </div>
            
            {/* Bottom Image Section */}
            <div className="h-24 md:h-32 bg-white flex items-center justify-center transition-all duration-300">
              <Image
                src="/assests/images/oslImg1.png"
                alt="Test Blog Title V"
                width={200}
                height={80}
                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* View All Blogs Button */}
        <div className="mt-[20px] sm:mt-[25px] md:mt-[30px] lg:mt-[35px]">
          <AppBtn
            btnText="View All Blogs"
            width="180px"
            height="45px"
            className="sm:w-[200px] sm:h-[50px] md:w-[220px] md:h-[55px] lg:w-[240px] lg:h-[60px]"
            icon={rightArrow}
            onClick={() => {
              router.push("/blog");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Subscribe />
      </div>
      
      <div className={`transition-opacity duration-300 ${isSliderOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Footer />
      </div>

      <GoTop />

    </div>
    </>
  );
}


export default Home;