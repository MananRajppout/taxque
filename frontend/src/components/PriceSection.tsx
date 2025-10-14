"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import YellowBg from "@/assests/images/YellowBg.svg";
import { PriceCard } from "@/components/Tools";
import type { priceDataProps } from "@/store/slices/serviceSlice";

interface PriceSectionProps {
  product: {
    _id: string;
    title: string;
    displayName?: string;
    priceData: priceDataProps[];
  };
  className?: string;
}

export default function PriceSection({ 
  product, 
  className = "" 
}: PriceSectionProps) {
  const [priceTab, setPriceTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className="w-full max-w-6xl py-6 sm:py-8 md:py-12.5 px-3 sm:px-4 md:px-5 lg:py-15 lg:px-10 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-10.5xl font-bold text-[#0d203b] text-center mb-5 sm:mb-6 md:mb-7.5 lg:mb-10 xl:mb-12.5 leading-tight">Right Plan For Your</h2>

        <div className="flex gap-2 sm:gap-3 md:gap-3.75 lg:gap-5 mb-6 sm:mb-8 md:mb-10 lg:mb-12.5 flex-wrap justify-center">
          {(product?.priceData || [])?.map((val: priceDataProps, i: number) => (
            <div
              key={i}
              onClick={() => setPriceTab(i)}
              className={`px-4 sm:px-5 md:px-6 lg:px-7.5 py-2 sm:py-2.5 md:py-3 rounded-4xl sm:rounded-5xl md:rounded-6.25 cursor-pointer transition-all duration-300 ease-in-out border-2 border-transparent outline-none hover:bg-gray-200 hover:-translate-y-0.5 focus:outline-2 focus:outline-[#fe8903] focus:outline-offset-2 ${priceTab === i ? 'bg-[#fe8903] border-[#fe8903] shadow-[0_4px_12px_rgba(254,137,3,0.3)]' : 'bg-gray-100'}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setPriceTab(i);
                }
              }}
              aria-label={`Select ${val?.title} plan`}
            >
              <p className={`text-3xl sm:text-3.5xl md:text-4xl lg:text-4.5xl font-semibold m-0 ${priceTab === i ? 'text-white' : 'text-gray-800'}`}>{val?.title}</p>
            </div>
          ))}
        </div>

        <div id="priceBox" className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 relative p-3 sm:p-4 md:p-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-7.5 lg:p-10 xl:gap-10 xl:p-15">
          <Image
            src={YellowBg}
            alt=""
            className="absolute -z-10 opacity-10 object-contain"
            fill
            quality={90}
            priority={false}
          />
          {(product?.priceData || [])?.map((el: any, i: number) => (
            <PriceCard
              {...el}
              priceTabe={priceTab}
              index={i}
              key={i}
              isMobile={isMobile}
              id={product?._id}
              productName={product?.title}
              priceId={el?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}