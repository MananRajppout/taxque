"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const homebg1 = "/assests/images/himg1.png";
const homebg2 = "/assests/images/himg2.webp";
const homebg3 = "/assests/images/himg3.jpg";

interface HomeCarouselProps {
  autoPlaySpeed?: number;
  className?: string;
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({
  autoPlaySpeed = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceType, setDeviceType] = useState("desktop");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const imgData = [homebg1, homebg2, homebg3];

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgData.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imgData.length) % imgData.length);
    }
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgData.length);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [autoPlaySpeed, imgData.length]);

  return (
    <div 
      className={`relative w-full h-full aspect-square rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-none overflow-hidden bg-gradient-to-br from-green-100 to-yellow-100 shadow-lg z-10 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        <Image
          src={imgData[currentIndex]}
          alt={`Hero Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          priority
          sizes="(max-width: 464px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Dots Hidden */}
    </div>
  );
};

export default HomeCarousel;