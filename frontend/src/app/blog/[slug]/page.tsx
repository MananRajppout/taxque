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

export default function BlogDetailsPage() {
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
  }, [slug, dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <div className="w-full h-[40px] flex flex-col relative bg-transparent text-black md:h-[60px] lg:h-[100px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        <div className="w-full flex items-center justify-start px-4 md:px-8 lg:px-16 mt-20">
          <p className="text-gray-600 text-sm md:text-base">
            <span onClick={() => router.push("/")} className="cursor-pointer hover:text-orange-500 transition-colors duration-300">Home</span>
            <span className="mx-2">&gt;</span>
            <span onClick={() => router.push("/blog")} className="cursor-pointer hover:text-orange-500 transition-colors duration-300">{Blog?.category || "Blog"}</span>
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
                <div className="w-full mb-8 overflow-hidden rounded-lg md:rounded-xl">
                  <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                    <Image 
                      src={Blog.imageUrl} 
                      alt={Blog.title || "Blog Image"} 
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66.67vw, 66.67vw"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Image src={avatarIcon} alt="Author" width={20} height={20} />
                  <p className="text-orange-500 font-medium">Amit</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={watchIcon} alt="Date" width={20} height={20} />
                  <p className="text-orange-500 font-medium">{Blog?.date}</p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{Blog?.title}</h1>
              {Blog?.description && (
                <p className="text-base md:text-lg text-gray-600 mb-3">{Blog.description}</p>
              )}
             

              {Blog?.blogText?.map((el, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{el.title}</h2>
                  {el?.summarys?.map((sm, ind: number) => (
                    <div key={ind} className="mb-4">
                      <div className="text-base md:text-lg text-gray-600 leading-relaxed">{parse(sm?.summary)}</div>
                    </div>
                  ))}
                </div>
              ))}
                <hr className="my-8 border-gray-200" />
            {Array.isArray(Blog?.tags) && Blog!.tags!.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                  {Blog!.tags!.map((t, i) => {
                    // Generate slug from tag name (same logic as generateTagSlug in admin)
                    const tagSlug = t
                      .toLowerCase()
                      .replace(/,/g, "")
                      .replace(/&/g, "and")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    
                    return (
                      <span
                        key={`${t}-${i}`}
                        onClick={() => {
                          router.push(`/tag/${tagSlug}`);
                          goTop();
                        }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 cursor-pointer transition-all duration-200"
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          

            <div className="w-full lg:w-1/3">
              <div className="mb-8">
                <ContactSection subjectList={categoryData.data} section="Blog" />
              </div>
              {categoryData?.data?.length && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">Our Services</h3>
                  <div className="space-y-4 mb-6">
                    {categoryData?.data?.slice(0, 2).map((el, i) => (
                      <ServiceCard {...el} key={i} />
                    ))}
                  </div>
                  <AppBtn btnText="Explore All Services" onClick={() => { router.push("/services"); goTop(); }} width="100%" height="50px" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 px-4 md:px-8 lg:px-16">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}


