"use client";

import React from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Subscribe from "@/components/Subscribe";
import { AppBtn } from "@/components/Button";

const sampleServices = [
  {
    title: "GST Notice Resolution Online in India",
    price: "₹2999",
    basic: "4599",
    rating: 4.8,
  },
  {
    title: "GST Revocation Services in India",
    price: "₹2999",
    basic: "4599",
    rating: 4.8,
  },
  {
    title: "Income Tax Filing - Basic",
    price: "₹999",
    basic: "1299",
    rating: 4.6,
  },
];

export default function NoticePage() {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <NavBar currentNav={"Our Services"} setCurrentNav={() => {}} />

      {/* Hero (plain, no background) */}
      <div className="w-full bg-white pt-[120px] pb-6">
        <div className="w-full px-6">
          <p className="text-sm text-orange-500">Home &gt; Income Tax Services</p>
          <h1 className="text-4xl font-extrabold mt-4">Category Related Service</h1>
        </div>
      </div>

      {/* Cards grid */}
      <div className="w-full px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px]">
          {sampleServices.map((s, i) => (
            <div key={i} className="bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <Image src="/assests/images/ITNIcon.svg" alt="icon" width={28} height={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <div className="text-sm text-gray-500 mt-2">Basic Price: <span className="line-through">{s.basic}</span></div>
                  </div>
                </div>
                <div className="text-sm text-yellow-500 font-semibold">{s.rating} ★★★★</div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Price:</div>
                  <div className="text-2xl font-bold text-orange-600">{s.price}<span className="text-base font-medium text-gray-500"> /month</span></div>
                </div>
                <div>
                  <button className="w-24 md:w-28 bg-white border-2 border-orange-500 hover:bg-orange-50 text-orange-500 hover:text-orange-600 font-semibold py-1.5 md:py-2 px-2 md:px-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-xs md:text-sm">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe */}
      <div className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Subscribe />
        </div>
      </div>

      <Footer />
    </div>
  );
}
