"use client";

import React, { useEffect, useState } from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function SuccessStories() {
  const [deviceType, setDeviceType] = useState("desktop");

  const reviewsData = [
    {
      name: "John Doe",
      review: "TaxQue provided excellent service! Very professional and efficient. Highly recommended for all tax needs.",
      rating: 5,
      date: "5/10/2025"
    },
    {
      name: "Jane Smith", 
      review: "I'm very impressed with their expertise. They made my tax filing process seamless and stress-free.",
      rating: 4,
      date: "3/10/2025"
    },
    {
      name: "David Lee",
      review: "Affordable and transparent pricing. The team was very responsive and helpful throughout the process.",
      rating: 5,
      date: "1/10/2025"
    },
    {
      name: "Emily Chen",
      review: "Customer-centric approach is truly their strength. They understood my unique situation and offered tailored solutions.",
      rating: 5,
      date: "28/9/2025"
    },
    {
      name: "Michael Brown",
      review: "Unmatched expertise in tax planning. They helped me save a significant amount. Fantastic service!",
      rating: 4,
      date: "25/9/2025"
    },
    {
      name: "Sarah Wilson",
      review: "Technology-driven solutions made everything so easy. Their platform is user-friendly and efficient.",
      rating: 5,
      date: "22/9/2025"
    }
  ];

  // Responsive configuration for reviews
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
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

  const ReviewCard = ({ review }: { review: any }) => (
    <div className="flex justify-center px-2">
      <div className="w-full max-w-62.5 p-3 bg-white border border-gray-200 rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] text-left cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                <div className="flex items-center mb-3.75">
                  <div className="w-10 h-10 bg-[#fe8903] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-4xl font-bold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-black text-3.5xl font-semibold">
                    {review.name}
                  </div>
                </div>
                
                <div className="mb-3.75">
                  {[...Array(5)].map((_, j) => (
                    <span 
                      key={j} 
                      className="text-4xl mr-0.5" 
                      style={{ color: j < review.rating ? '#FFD700' : '#E5E5E5' }}
                    >★</span>
                  ))}
                </div>
                
                <div className="text-gray-600 text-3.25 leading-relaxed mb-3.75">
                  {review.review}
                </div>
                
                <div className="text-gray-400 text-3xl">
                  {review.date}
                </div>
              </div>
            </div>
  );

  return (
    <div className="w-full py-15 px-5 bg-gray-50 text-center relative overflow-hidden">
      <p className="text-[18px] font-bold font-[poppinsBold] text-center mb-[25px] sm:text-[20px] sm:mb-[30px] md:text-[26px] md:mb-[30px] lg:text-[46px]">Success Stories & Reviews</p>

      <div className="success-stories-carousel">
        <MultiCarousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={true}
          partialVisbile={false}
          centerMode={false}
        >
          {reviewsData.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
}