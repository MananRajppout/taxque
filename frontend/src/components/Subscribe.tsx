"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const rightArrow = "/assests/images/rightArrow.svg";
const MobileImg = "/assests/images/MobileImg.png";
const subBg = "/assests/images/subBg.svg";
const hiwBg = "/assests/images/hiwBg.svg";
import { AppBtn } from "@/components/Button";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [deviceType, setDeviceType] = useState("desktop");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
  };

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 640) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else if (window.innerWidth < 1280) {
        setDeviceType("laptop");
      } else if (window.innerWidth < 1536) {
        setDeviceType("desktop");
      } else {
        setDeviceType("superLargeDesktop");
      }
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  // Responsive configuration for subscribe carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 1,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1280 },
      items: 1,
      slidesToSlide: 1,
    },
    laptop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const SubscribeCard = () => (
    <div className="w-full py-4 px-3 flex justify-center items-center sm:py-6 sm:px-4 md:py-8 md:px-6 lg:py-12 lg:px-8 xl:py-16 xl:px-12">
      <div className="w-full max-w-4xl min-h-[250px] bg-white rounded-2xl p-4 flex flex-col items-start justify-center relative overflow-hidden shadow-lg border border-gray-200 sm:min-h-[280px] sm:p-6 sm:rounded-3xl md:min-h-[320px] md:p-8 lg:min-h-[350px] lg:p-10 lg:rounded-4xl xl:min-h-[380px] xl:p-12 xl:flex-row xl:justify-between xl:items-center xl:max-w-5xl">
        {/* Background decoration */}
        <Image
          src={subBg}
          alt=""
          className="absolute right-0 bottom-0 z-0 opacity-20 sm:opacity-25 md:opacity-30"
          width={200}
          height={150}
          priority
        />
        
        {/* Mobile/Tablet Image - Hidden on desktop */}
        <div className="block mb-6 sm:mb-8 md:mb-10 lg:hidden">
          <div className="relative w-full max-w-[200px] mx-auto bg-white rounded-xl p-3 shadow-lg sm:max-w-[250px] md:max-w-[300px]">
            <Image
              src={hiwBg}
              alt="Background Pattern"
              className="absolute left-0 top-0 z-10 opacity-60 w-full h-full object-cover rounded-xl"
              width={300}
              height={400}
              priority
            />
            <Image
              src={MobileImg}
              alt="Mobile App"
              className="relative z-20 w-full h-auto max-h-[200px] object-contain sm:max-h-[250px] md:max-h-[300px]"
              width={300}
              height={400}
              priority
            />
          </div>
        </div>

        {/* Desktop Image - Hidden on mobile/tablet */}
        <div className="hidden absolute right-3 top-1/2 transform -translate-y-1/2 z-10 h-4/5 max-h-[280px] items-center bg-white rounded-2xl p-2 shadow-lg xl:flex xl:max-h-[320px]">
          <Image
            src={hiwBg}
            alt="Background Pattern"
            className="absolute left-0 z-10 opacity-80 w-auto h-full object-cover rounded-xl"
            width={150}
            height={300}
            priority
          />
          <Image
            src={MobileImg}
            alt="Mobile App"
            className="relative z-20 w-auto h-full max-h-[280px] object-contain xl:max-h-[320px]"
            width={300}
            height={600}
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 w-full max-w-full xl:max-w-[60%] xl:mx-0 xl:px-8">
          <h2 className="text-lg font-bold text-gray-800 text-left mb-3 relative z-20 leading-tight sm:text-xl sm:mb-4 md:text-2xl md:mb-5 lg:text-3xl lg:mb-6 xl:text-left xl:text-4xl">
            Subscribe to Our Newsletter and Reduce your tax liability up to 26%
          </h2>
          <p className="text-sm text-gray-600 text-left mb-4 max-w-full relative z-20 leading-relaxed sm:text-base sm:mb-5 sm:max-w-lg md:text-lg md:mb-6 md:max-w-xl lg:text-lg lg:mb-8 xl:text-left xl:text-base xl:max-w-xl">
            We are India's most trusted tax filing platform. Our team goes
            through in-depth training to help you plan and minimize your tax
            liability.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-full h-8 bg-white rounded-full flex items-center p-0.5 relative z-20 shadow-md sm:h-10 sm:p-1 sm:max-w-sm md:h-12 md:max-w-md lg:h-14 lg:max-w-lg xl:max-w-lg xl:mx-0 xl:h-16">
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-full border-none px-2 text-xs bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 sm:px-3 sm:text-sm md:text-base md:px-4 lg:text-lg lg:px-5 xl:text-lg xl:px-6"
              required
            />
            <AppBtn
              btnText="Subscribe"
              icon={rightArrow}
              width="70px"
              height="100%"
            />
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="subscribe-carousel">
      <MultiCarousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
  ssr={true}
  infinite={false}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["superLargeDesktop", "desktop", "laptop", "tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        partialVisbile={false}
        centerMode={false}
      >
        <SubscribeCard />
      </MultiCarousel>
    </div>
  );
}