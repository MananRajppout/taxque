"use client";

import React, { useEffect, useState } from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ServiceCard, BlogCard, MemberCard } from "./Tools";

export interface BlogDataType {
  title: string;
  Slug: string;
  metaTitle: string;
  metaDescription: string;
  imageUrl?: string;
  blogText: {
    title: string;
    summarys: { summary: string }[];
  }[];
  date?: string;
  category?: string;
  _id?: string;
}

export interface TeamDataType {
  name: string;
  email: string;
  imgUrl: string;
  role: string;
  summary: string;
  media: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  _id?: string;
}

export interface CategoryDataType {
  title: string;
  summary: string;
  img: string;
  Slug?: string;
  _id?: string;
}

type CardName = "BlogCard" | "ServicesCard" | "memberCard" | "mainCategory";

interface CarouselProps {
  data?: BlogDataType[] | TeamDataType[] | CategoryDataType[] | any[];
  cardName?: CardName;
  children?: React.ReactNode;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  className?: string;
}


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const Carousel: React.FC<CarouselProps> = ({
  data,
  cardName,
  children,
  autoPlay = false,
  autoPlaySpeed = 3000,
  className = "",
}) => {
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

  const renderItems = () => {
    if (children) return children;
    if (!data) return null;

    return data.map((el, i) => {
      if (cardName === "BlogCard") {
        return <BlogCard key={i} {...(el as BlogDataType)} />;
      }
      if (cardName === "ServicesCard") {
        return (
          <ServiceCard
            key={i}
            imageUrl={el.img}
            title={el.title}
            summary={el.summary}
            Slug={el.Slug || el.title?.toLowerCase().replace(/\s+/g, '-')}
            _id={el._id || i.toString()}
          />
        );
      }
      if (cardName === "memberCard") {
        return <MemberCard key={i} {...(el as TeamDataType)} />;
      }
      if (cardName === "mainCategory") {
        return (
          <ServiceCard
            key={i}
            imageUrl={el.img}
            title={el.title}
            summary={el.summary}
            Slug={el.Slug || el.title?.toLowerCase().replace(/\s+/g, '-')}
            _id={el._id || i.toString()}
          />
        );
      }
      return null;
    });
  };

  if (!data || data.length === 0) return null;

  return (
    <div className={`py-4 sm:py-6 md:py-8 w-full relative ${className}`}>
      <MultiCarousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={autoPlay}
        autoPlaySpeed={autoPlaySpeed}
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
          {renderItems()}
      </MultiCarousel>
    </div>
  );
};

export default Carousel;