"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (use public paths)
const pageBg = "/assests/images/otherPageBg.svg";
const rightArrow = "/assests/images/rightArrow.svg";
const arrowLine = "/assests/images/arrowLine.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { JobCard } from "@/components/Tools";
import { AppBtn } from "@/components/Button";
import Subscribe from "@/components/Subscribe";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchJob } from "@/store/slices/jobSlice";
import { JobDataType } from "@/store/slices/jobSlice";

// Helper function to extract category from job title and description
const extractCategory = (job: JobDataType): string => {
  const title = job.title?.toLowerCase() || "";
  const description = job.description?.toLowerCase() || "";
  const combined = `${title} ${description}`;

  // Engineering keywords
  if (
    combined.match(/\b(engineer|developer|programmer|coder|software|frontend|backend|full.?stack|devops|sre|qa|test|technical|architect|tech lead|engineering)\b/i)
  ) {
    return "Engineering";
  }

  // Product keywords
  if (
    combined.match(/\b(product manager|product owner|pm|product designer|ux|ui designer|designer|product)\b/i)
  ) {
    return "Product";
  }

  // Customer success/support keywords
  if (
    combined.match(/\b(customer success|customer support|support|customer service|cs|account manager|customer)\b/i)
  ) {
    return "Customer success";
  }

  // Sales & marketing keywords
  if (
    combined.match(/\b(sales|marketing|business development|bd|account executive|ae|marketer|growth|seo|sem|content|social media)\b/i)
  ) {
    return "Sales & marketing";
  }

  // Default to "Other" if no match
  return "Other";
};

// Get unique categories from jobs
const getUniqueCategories = (jobs: JobDataType[]): string[] => {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return ["All roles"];
  }

  const categories = new Set<string>();
  jobs.forEach((job) => {
    const category = extractCategory(job);
    if (category !== "Other") {
      categories.add(category);
    }
  });

  const sortedCategories = Array.from(categories).sort();
  return ["All roles", ...sortedCategories];
};

// Filter jobs by category
const filterJobsByCategory = (jobs: JobDataType[], category: string): JobDataType[] => {
  if (!Array.isArray(jobs)) return [];
  if (category === "All roles") return jobs;

  return jobs.filter((job) => extractCategory(job) === category);
};

export default function CareersPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.job);
  const [currentNav, setCurrentNav] = React.useState("Careers");
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [activeFilter, setActiveFilter] = useState("All roles");

  useEffect(() => {
    if (data?.length <= 0) {
      dispatch(FetchJob());
    }
  }, [dispatch, data]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter]);

  // Get dynamic categories from jobs
  const categories = React.useMemo(() => {
    return getUniqueCategories(Array.isArray(data) ? data : []);
  }, [data]);

  // Filter jobs based on active filter
  const filteredJobs = React.useMemo(() => {
    return filterJobsByCategory(Array.isArray(data) ? data : [], activeFilter);
  }, [data, activeFilter]);

  const jobCount = Array.isArray(data) ? data.length : 0;
  const filteredJobCount = filteredJobs.length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-gray-50 text-black">
      {/* Hero Section with NavBar */}
      <div className="w-full flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-[300px] -z-10">
          <Image src={pageBg} className="object-cover" alt="Page Background" fill priority />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 py-6 mt-20 sm:py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_2.2fr] gap-7 mb-8">
          {/* Hero Left */}
          <div className="p-[22px_22px_20px] rounded-[26px] bg-gradient-to-br from-[rgba(254,137,3,0.04)] to-[rgba(15,23,42,0.03)] border border-[rgba(148,163,184,0.4)] backdrop-blur-[12px] shadow-[0_18px_40px_rgba(15,23,42,0.08)] relative overflow-hidden">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.28)] text-[11px] text-[#166534] mb-3">
              <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shadow-[0_0_0_6px_rgba(34,197,94,0.3)]"></span>
              We're hiring
              <span className="px-2 py-0.5 rounded-full bg-white text-[10px] uppercase tracking-wider text-[#065f46] border border-[rgba(22,163,74,0.18)]">
                Remote-friendly • India-first
              </span>
            </div>

            <h1 className="text-[clamp(26px,3vw,32px)] font-bold tracking-[-0.03em] mb-2">
              Join the team simplifying<br />
              <span className="bg-gradient-to-r from-[#fe8903] via-[#fe8903] to-[#22c55e] bg-clip-text text-transparent">
                tax & compliance for India.
              </span>
            </h1>

            <p className="text-[13px] text-[#6b7280] max-w-[460px] mb-4">
              At Taxque, we're building tools that make GST, ITR filing, and business compliance feel effortless for
              every Indian business. Come shape the next generation of tax technology with us.
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3.5 text-[11px] mb-4.5 text-[#6b7280]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 border border-[rgba(148,163,184,0.5)]">
                <strong className="text-gray-900 font-semibold">{jobCount}</strong> open roles
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 border border-[rgba(148,163,184,0.5)]">
                <strong className="text-gray-900 font-semibold">Hybrid</strong> Bengaluru & Remote
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 border border-[rgba(148,163,184,0.5)]">
                <strong className="text-gray-900 font-semibold">Fast-growing</strong> early team
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-3.5">
              <button
                onClick={() => router.push("#jobs")}
                className="px-4 py-2.5 rounded-full border-none outline-none text-[13px] font-medium inline-flex items-center gap-1.5 bg-gray-900 text-white cursor-pointer shadow-[0_16px_35px_rgba(15,23,42,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.65)] hover:bg-[#020617]"
              >
                Apply now
                <span className="text-[15px] leading-none">→</span>
              </button>
              <button
                onClick={() => router.push("/about")}
                className="px-3.5 py-2.5 rounded-full border border-[rgba(148,163,184,0.7)] bg-white/90 text-[12px] font-medium text-gray-900 inline-flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-[#9ca3af] hover:shadow-[0_10px_22px_rgba(148,163,184,0.5)]"
              >
                Meet the team
                <span className="text-[15px] leading-none">👋</span>
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center flex-wrap gap-2.5 text-[11px] text-[#4b5563]">
              <div>💼 Typical roles: <strong className="text-[#fe8903]">Developers, Product, Support, Sales</strong></div>
              <div>✨ Expect ownership, learning, and impact from Day 1.</div>
            </div>
          </div>

          {/* Hero Right */}
          <div className="relative">
            <div className="bg-white/94 rounded-[24px] p-[18px_18px_16px] border border-[rgba(148,163,184,0.5)] shadow-[0_18px_40px_rgba(15,23,42,0.08)] relative overflow-hidden">
              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <div className="text-[14px] font-semibold mb-1">Why people love working here</div>
                  <div className="text-[11px] text-[#6b7280]">A quick snapshot of life at Taxque</div>
                </div>
                <div className="px-2.5 py-1.5 rounded-full text-[10px] bg-[rgba(254,137,3,0.08)] border border-[rgba(254,137,3,0.3)] text-[#fe8903] inline-flex items-center gap-1.5">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e]"></span>
                  Growing team
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] mb-3">
                <span className="px-2 py-1 rounded-full bg-[#f3f4f6] text-[#4b5563]">Flexible hours</span>
                <span className="px-2 py-1 rounded-full bg-[#f3f4f6] text-[#4b5563]">Learning budget</span>
                <span className="px-2 py-1 rounded-full bg-[#f3f4f6] text-[#4b5563]">Modern stack</span>
                <span className="px-2 py-1 rounded-full bg-[#f3f4f6] text-[#4b5563]">Direct impact</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2.5">
                <div className="p-2 rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] text-[10px] flex flex-col gap-0.5">
                  <span className="text-[#6b7280]">Team size</span>
                  <span className="font-semibold text-gray-900">20+ people</span>
                </div>
                <div className="p-2 rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] text-[10px] flex flex-col gap-0.5">
                  <span className="text-[#6b7280]">Avg. experience</span>
                  <span className="font-semibold text-gray-900">5+ years</span>
                </div>
                <div className="p-2 rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] text-[10px] flex flex-col gap-0.5">
                  <span className="text-[#6b7280]">Employee NPS</span>
                  <span className="font-semibold text-gray-900">9.1 / 10</span>
                </div>
              </div>

              <div className="mt-1.5 rounded-full bg-[#f3f4f6] h-1.5 overflow-hidden">
                <div className="w-[68%] h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#fe8903]"></div>
              </div>

              <div className="absolute -top-[18px] -right-[10px] px-2.5 py-1.5 rounded-full bg-gray-900 text-gray-50 text-[10px] inline-flex items-center gap-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.7)]">
                Top 5% talent
                <span className="w-[18px] h-[18px] rounded-full bg-[#22c55e] flex items-center justify-center text-[10px]">⭐</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="mb-5 flex flex-wrap gap-2.5 items-center justify-between">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="text-[12px] font-medium text-[#4b5563]">Explore roles by:</span>
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1.5 rounded-full border text-[11px] cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-gray-50 border-gray-900 shadow-[0_14px_30px_rgba(15,23,42,0.7)]"
                    : "bg-white text-[#4b5563] border-[rgba(148,163,184,0.7)] hover:bg-gray-50 hover:border-[#9ca3af]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#6b7280]">
            <span className="px-2.5 py-1.5 rounded-full bg-[rgba(254,137,3,0.06)] text-[#fe8903] border border-[rgba(254,137,3,0.32)]">
              {activeFilter === "All roles" ? jobCount : filteredJobCount} {activeFilter === "All roles" ? "roles" : `${activeFilter.toLowerCase()} roles`} open
            </span>
            <span>Updated daily · Remote & hybrid options</span>
          </div>
        </section>

        {/* Jobs Section */}
        <section id="jobs" className="bg-white/90 rounded-[26px] p-[18px_16px_20px] border border-[rgba(148,163,184,0.5)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between mb-4 gap-2.5">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold tracking-[-0.01em]">Open positions</h2>
              <p className="text-[11px] text-[#6b7280]">
                Pick a role that fits you. If you don't see the perfect match, apply anyway — we love generalists.
              </p>
            </div>
            <select className="text-[11px] px-2.5 py-1.5 rounded-full border border-[#e5e7eb] bg-[#f9fafb] text-[#4b5563] outline-none cursor-pointer">
              <option>Sort by: Most recent</option>
              <option>Sort by: Role</option>
              <option>Sort by: Location</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.slice(0, visibleCount).map((job) => (
                <JobCard
                  key={job._id || job.title}
                  _id={job._id}
                  title={job.title}
                  description={job.description}
                  location={job.location}
                  experience={job.experience}
                  salary={job.salary}
                  type={job.type}
                  skills={job.skills}
                  postedDate={job.postedDate}
                  jobLocation={job.jobLocation}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-[#6b7280] py-8">
                {activeFilter === "All roles" 
                  ? "No openings available right now."
                  : `No ${activeFilter.toLowerCase()} roles available right now.`}
              </div>
            )}
          </div>

          {filteredJobs.length > visibleCount && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="px-4 py-2 rounded-full border-none outline-none bg-gray-900 text-white text-[12px] font-medium cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-[#020617] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(15,23,42,0.35)]"
              >
                Load more
                <span className="text-[15px] leading-none">→</span>
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-4.5 p-3.5 rounded-[20px] bg-[#020617] text-[#e5e7eb] flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-[12px]">
              Don't see a role that fits? <strong className="text-white">We still want to hear from you.</strong><br />
              Tell us how you'd like to contribute and we'll reach out if there's a match.
            </div>
            <button
              onClick={() => window.location.href = "mailto:hr@Taxque.com"}
              className="px-3.5 py-2 rounded-full border-none outline-none bg-gray-50 text-[#020617] text-[12px] font-medium cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 hover:bg-[#e5e7eb] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(15,23,42,0.35)]"
            >
              Share your profile
              <span className="text-[15px] leading-none">✉</span>
            </button>
          </div>
        </section>
      </div>

      {/* Subscribe Section */}
      <div className="w-full py-12 px-4 md:px-8 lg:px-16 mt-8">
        <Subscribe />
      </div>

      <Footer />
    </div>
  );
}