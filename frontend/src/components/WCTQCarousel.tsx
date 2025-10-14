"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/lib/style.css";

import { TaxQueData } from "@/assests/Data/page";
const TaxQueImg = "/assests/images/TaxQueImg.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface WCTQCarouselProps {
  autoPlaySpeed?: number;
  className?: string;
}

interface TaxQueCardProps {
  icon: any;
  title: string;
  summery: string;
  className?: string;
}

const TaxQueCard = ({ icon, title, summery, className = "" }: TaxQueCardProps) => (
  <div className={`w-full p-3 bg-transparent text-center transition-all duration-300 ease-in-out ${className}`}>
    <div className="w-10 h-10 mx-auto mb-2 relative transition-transform duration-300 ease-in-out hover:scale-110 lg:w-14 lg:h-14 lg:mb-4">
      <Image src={icon} alt={title} width={64} height={64} className="w-full h-full object-contain transition-transform duration-300 ease-in-out" />
    </div>
    <h3 className="text-lg font-black text-white m-0 mb-2 font-[poppinsBold] leading-tight text-center tracking-wide break-words lg:text-2xl lg:mb-4">{title}</h3>
    <p className="text-xs text-white leading-relaxed m-0 font-[poppinsRegular] font-normal text-center tracking-wide break-words lg:text-base">{summery}</p>
  </div>
);

export default function WCTQCarousel({ 
  autoPlaySpeed = 3000,
  className = "" 
}: WCTQCarouselProps) {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 464) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  if (!TaxQueData || TaxQueData.length === 0) return null;

  return (
    <div className={`w-full py-6 px-2 relative bg-transparent overflow-hidden transition-all duration-300 ease-in-out min-h-[300px] md:py-8 md:px-4 md:min-h-[380px] lg:py-10 lg:px-6 lg:min-h-[420px] ${className}`}>
      <Image 
        src={TaxQueImg} 
        alt="TaxQue Background" 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        fill
        priority
      />
      
      <div className="text-center mb-3 z-10 relative md:mb-4 lg:mb-6">
        <h2 className="text-white text-2xl font-bold font-[poppinsBold] m-0 md:text-3xl lg:text-4xl break-words">Why Choose TaxQue?</h2>
      </div>

      <div className="taxQueCardBox">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={autoPlaySpeed}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={true}
        >
          {TaxQueData?.map((el: any, i: number) => (
            <TaxQueCard {...el} key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}