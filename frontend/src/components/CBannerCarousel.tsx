"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Clogo1 = "/assests/images/CLogo1.svg";
const Clogo2 = "/assests/images/CLogo2.svg";
const Clogo3 = "/assests/images/CLogo3.svg";
const Clogo4 = "/assests/images/CLogo4.svg";
const Clogo5 = "/assests/images/CLogo5.svg";
const Clogo6 = "/assests/images/CLogo6.svg";
const Clogo7 = "/assests/images/CLogo7.svg";
const Clogo8 = "/assests/images/CLogo8.svg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const BNCarousel = () => {
  const [deviceType, setDeviceType] = useState("desktop");

  const imgData = [
    Clogo1,
    Clogo2,
    Clogo3,
    Clogo4,
    Clogo5,
    Clogo6,
    Clogo7,
    Clogo8,
  ];

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 640) {
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

  const LogoCard = ({ logo, index }: { logo: any; index: number }) => (
    <div className="flex justify-center items-center px-1 sm:px-2 md:px-2.5">
      <Image 
        src={logo} 
        alt={`Client Logo ${index + 1}`} 
        width={120} 
        height={60}
        className="max-w-full h-12 sm:h-16 md:h-20 grayscale contrast-120 brightness-110 opacity-80 transition-all duration-300 ease-in-out scale-105 sm:scale-110 hover:grayscale-0 hover:contrast-130 hover:brightness-120 hover:opacity-100 hover:scale-110 sm:hover:scale-120"
      />
    </div>
  );

  return (
    <div className="py-2 sm:py-3 md:py-4 overflow-hidden w-full">
      <div className="banner-carousel">
        <MultiCarousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={true}
          partialVisbile={false}
          centerMode={false}
        >
          {imgData.map((logo, i) => (
            <LogoCard key={i} logo={logo} index={i} />
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
};

export default BNCarousel;