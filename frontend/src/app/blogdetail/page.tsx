"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";

const smPageBG = "/assests/images/smPageBG.svg";
const avatarIcon = "/assests/images/Avatar.svg";
const watchIcon = "/assests/images/timeIcon.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import ContactSection from "@/components/ContactSection";
import Subscribe from "@/components/Subscribe";
import { ServiceCard } from "@/components/Tools";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchBlogBySlug } from "@/store/slices/blogSlice";

export default function BlogDetails() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();
  const { Blog } = useSelector((state: RootState) => state.blog);
  const categoryData = useSelector((state: RootState) => state.category);
  const [currentNav, setCurrentNav] = React.useState("Blog");

  useEffect(() => {
    if (!slug) return;
    dispatch(FetchBlogBySlug({ slug }));
    if (Blog) {
      dispatch(FetchBlogBySlug({ slug }));
    }
  }, [slug, dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <div className="w-full h-[200px] flex flex-col relative bg-transparent text-black md:h-[250px] lg:h-[300px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
        <div className="flex items-center justify-center mt-20 px-4">
          <p className="text-gray-600 text-sm md:text-base">
            <span 
              onClick={() => router.push("/")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              Home
            </span>
            <span className="mx-2">&gt;</span>
            <span 
              onClick={() => router.push("/blog")} 
              className="cursor-pointer hover:text-orange-500 transition-colors duration-300"
            >
              {Blog?.category || "Blog"}
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">{Blog?.title || "Blog Details"}</span>
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              {Blog?.imageUrl && (
                <div className="w-full mb-8">
                  <Image 
                    src={Blog.imageUrl} 
                    alt={Blog.title || "Blog Image"} 
                    width={800} 
                    height={400} 
                    className="w-full h-auto rounded-lg md:rounded-xl"
                  />
                </div>
              )}

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Image src={avatarIcon} alt="Author" width={20} height={20} />
                  <p className="text-orange-500 font-medium">Amit</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={watchIcon} alt="Date" width={20} height={20} />
                  <p className="text-orange-500 font-medium">{Blog?.date}</p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                {Blog?.title}
              </h1>

              {Blog?.blogText?.map((el, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                    {el.title}
                  </h2>
                  {el?.summarys?.map((sm, ind: number) => (
                    <div key={ind} className="mb-4">
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {parse(sm?.summary)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
              
            <div className="w-full lg:w-1/3">
              {/* Contact Section */}
              <div className="mb-8">
                <ContactSection subjectList={categoryData.data} section="Blog" />
              </div>

              {/* Our Services */}
              {categoryData?.data?.length && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
                    Our Services
                  </h3>
                  <div className="space-y-4 mb-6">
                    {categoryData?.data?.slice(0, 2).map((el, i) => (
                      <ServiceCard {...el} key={i} />
                    ))}
                  </div>
                  <AppBtn
                    btnText="Explore All Services"
                    onClick={() => {
                      router.push("/services");
                      goTop();
                    }}
                    width="100%"
                    height="50px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      {/* Popular Services Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Popular Services
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categoryData?.data?.slice(0, 20).map((el, i) => (
              <div
                onClick={() => {
                  router.push(`/services/${el?.Slug}`);
                  goTop();
                }}
                key={i}
                className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <p className="text-sm md:text-base text-gray-700 hover:text-orange-600">
                  {el?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
