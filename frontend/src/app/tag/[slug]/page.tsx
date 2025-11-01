"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const pageBg = "/assests/images/otherPageBg.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { BlogCard } from "@/components/Tools";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchBlogsByTag } from "@/store/slices/blogSlice";

export default function TagPage() {
  const router = useRouter();
  const params = useParams();
  const tagSlug = params?.slug as string;
  const dispatch = useDispatch<AppDispatch>();
  const { blogsByTag, tagInfo, status } = useSelector((state: RootState) => state.blog);
  const [currentNav, setCurrentNav] = React.useState("Blog");

  useEffect(() => {
    if (!tagSlug) return;
    dispatch(FetchBlogsByTag({ tagSlug }));
  }, [tagSlug, dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show only published posts
  const publishedBlogs = Array.isArray(blogsByTag)
    ? blogsByTag.filter((b) => (b.status ?? "Published") === "Published")
    : [];

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="w-full h-[200px] flex flex-col relative bg-transparent text-black md:h-[250px] lg:h-[300px]">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <Image src={pageBg} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
        
        {/* Navigation Breadcrumb */}
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
              Blog
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800 font-medium">
              {tagInfo?.tagName || "Tag"}
            </span>
          </p>
        </div>

        {/* Main Heading */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            {tagInfo?.tagName ? `Tag: ${tagInfo.tagName}` : "Tag"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Tag Description */}
          {tagInfo?.tagDescription && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {tagInfo.tagDescription}
              </p>
            </div>
          )}

          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            {publishedBlogs.length > 0 
              ? `${publishedBlogs.length} ${publishedBlogs.length === 1 ? 'Blog Post' : 'Blog Posts'} tagged with "${tagInfo?.tagName || 'this tag'}"`
              : `No posts found for tag "${tagInfo?.tagName || 'this tag'}"`
            }
          </h2>

          {/* Loading State */}
          {status === "loading" && (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-500 text-lg">Loading...</div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="flex justify-center items-center py-20">
              <div className="text-red-500 text-lg">Error loading blog posts. Please try again later.</div>
            </div>
          )}

          {/* Blog Posts */}
          {status === "idle" && publishedBlogs.length > 0 && (
            <div className="w-full space-y-4">
              {publishedBlogs.map((el, i) => (
                <React.Fragment key={i}>
                  <BlogCard {...el} />
                  {i !== publishedBlogs.length - 1 && (
                    <div className="w-full border-t border-gray-300 my-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Empty State */}
          {status === "idle" && publishedBlogs.length === 0 && tagInfo?.tagName && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-gray-500 text-lg mb-4">No blog posts found for this tag.</p>
              <button
                onClick={() => {
                  router.push("/blog");
                  goTop();
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View All Blogs
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}


