"use client";

import { useRef, useState, useEffect } from "react";

interface AppSliderProps {
  data: any[];
  autoPlaySpeed?: number;
  className?: string;
}

interface MemberCardProps {
  name?: string;
  title?: string;
  image?: string;
  description?: string;
  [key: string]: any;
}

const MemberCard = ({ name, title, image, description, ...props }: MemberCardProps) => (
  <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[rgba(100,100,111,0.3)_0px_10px_35px_0px]" {...props}>
    {image && (
      <div className="w-full h-40 sm:h-45 md:h-50 lg:h-62.5 overflow-hidden">
        <img src={image} alt={name || "Member"} className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
      </div>
    )}
    <div className="p-3 sm:p-4 md:p-5 text-center">
      {name && <h3 className="text-3xl sm:text-4xl md:text-4.5xl lg:text-5xl font-semibold text-gray-800 mb-1.5 sm:mb-2 md:mb-2.5 m-0">{name}</h3>}
      {title && <p className="text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl text-[#fe8903] mb-2 sm:mb-2.5 md:mb-3 m-0 font-medium">{title}</p>}
      {description && <p className="text-2.5xl sm:text-3xl md:text-3.5xl lg:text-3.75 text-gray-600 leading-relaxed m-0">{description}</p>}
    </div>
  </div>
);

export default function AppSlider({ 
  data, 
  autoPlaySpeed = 3000,
  className = "" 
}: AppSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || !data?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, data.length - slidesToShow);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [isAutoPlaying, data?.length, slidesToShow, autoPlaySpeed]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, data.length - slidesToShow) : prev - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, data.length - slidesToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        goToPrevious();
        break;
      case "ArrowRight":
        goToNext();
        break;
      case " ":
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
        break;
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div
      className={`w-full mt-5 sm:mt-6 md:mt-7.5 py-3 sm:py-4 md:py-5 relative overflow-hidden outline-none transition-all duration-300 ease-in-out focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Image slider"
    >
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-5 md:gap-6.25"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {data.map((el, i) => (
            <div key={i} className="flex-none min-w-0 flex justify-center" style={{ flex: `0 0 calc(100% - 20px)` }}>
              <MemberCard {...el} />
            </div>
          ))}
        </div>
      </div>

      {data.length > slidesToShow && (
        <>
          <button
            className="absolute top-1/2 left-1.5 sm:left-2 md:left-2.5 lg:left-5 transform -translate-y-1/2 bg-black/60 text-white border-none w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out z-2 backdrop-blur-sm hover:bg-black/80 hover:scale-110 active:scale-95"
            onClick={goToPrevious}
            aria-label="Previous slide"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="absolute top-1/2 right-1.5 sm:right-2 md:right-2.5 lg:right-5 transform -translate-y-1/2 bg-black/60 text-white border-none w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out z-2 backdrop-blur-sm hover:bg-black/80 hover:scale-110 active:scale-95"
            onClick={goToNext}
            aria-label="Next slide"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-2.5 mt-3 sm:mt-4 md:mt-5" role="tablist" aria-label="Slider navigation">
        {Array.from({ length: Math.ceil(data.length / slidesToShow) }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-[#fe8903] cursor-pointer transition-all duration-300 ease-in-out p-0 backdrop-blur-sm hover:bg-[rgba(254,137,3,0.5)] hover:scale-120 ${i === Math.floor(currentIndex / slidesToShow) ? 'bg-[#fe8903] scale-130 shadow-[0_0_10px_rgba(254,137,3,0.5)]' : 'bg-transparent'}`}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(i * slidesToShow);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            aria-label={`Go to slide group ${i + 1}`}
            role="tab"
            aria-selected={i === Math.floor(currentIndex / slidesToShow)}
            type="button"
          />
        ))}
      </div>

    </div>
  );
}