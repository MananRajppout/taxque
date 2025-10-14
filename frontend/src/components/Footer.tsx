"use client";

import Image from "next/image";
import Link from "next/link";

const FooterClogo = "/assests/images/footerClog.svg";
const hrLine1 = "/assests/images/hrLine1.svg";
const facebookIcon = "/assests/images/facebook.svg";
const xIcon = "/assests/images/xIcom.svg";
const instagramIcon = "/assests/images/instagram.svg";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent) => {
    scrollToTop();
  };

  return (
    <footer className={`w-full flex flex-col justify-center items-center relative pt-12 pb-8 mt-8 bg-[#0D203B] transition-all duration-300 ease-in-out md:pt-16 md:mt-12 lg:pt-20 lg:mt-16 ${className}`}>
      <Link href="/" onClick={handleNavClick} className="block transition-transform duration-300 ease-in-out hover:scale-105 mb-2">
        <Image
          src={FooterClogo}
          alt="TaxQue Logo"
          className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
          width={180}
          height={70}
          priority
        />
      </Link>
      <p className="text-sm text-gray-300 mb-6">Reach new heights</p>

      <Image
        src={hrLine1}
        alt=""
        className="w-85 max-w-6xl h-auto mt-4 opacity-80 lg:mt-6"
        width={1200}
        height={2}
      />

      <div className="w-full max-w-6xl flex flex-col justify-center gap-8 mt-8 px-4 md:mt-10 md:px-8 md:flex-row lg:mt-12 lg:px-12">
        <div className="w-full flex flex-col mb-6 md:w-1/4 md:mb-0">
          <h3 className="font-bold text-lg text-white mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-1.25 no-underline lg:text-xl">Quick Links</h3>
          <Link href="/" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Home
          </Link>
          <Link href="/about" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            About Us
          </Link>
          <Link href="/pricing" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Pricing
          </Link>
          <Link href="/contact-us" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Contact Us
          </Link>
        </div>

        <div className="w-full flex flex-col mb-6 md:w-1/4 md:mb-0">
          <Link href="/services" onClick={handleNavClick} className="no-underline">
            <h3 className="font-bold text-lg text-white mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-1.25 lg:text-xl">Services</h3>
          </Link>
          <p className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 block">GST Compliance and Filing</p>
          <p className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 block">Income Tax Services</p>
          <p className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 block">ROC Compliance</p>
          <p className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 block">Business Registration Services</p>
        </div>

        <div className="w-full flex flex-col mb-6 md:w-1/4 md:mb-0">
          <h3 className="font-bold text-lg text-white mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-1.25 no-underline lg:text-xl">Resources</h3>
          <Link href="/blog" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Blog
          </Link>
          <Link href="/team" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Our Team
          </Link>
          <Link href="/careers" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Career
          </Link>
          <Link href="/faq" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            FAQ
          </Link>
        </div>

        <div className="w-full flex flex-col mb-6 md:w-1/4 md:mb-0">
          <h3 className="font-bold text-lg text-white mb-6 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-1.25 no-underline lg:text-xl">Usage</h3>
          <Link href="/terms-of-use" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Terms & Conditions
          </Link>
          <Link href="/privacy" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Privacy Policy
          </Link>
          <Link href="/refund" onClick={handleNavClick} className="text-base text-white mb-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-white/80 hover:translate-x-2 hover:bg-white/10 py-1 rounded px-2 no-underline block">
            Refund Policy
          </Link>
        </div>
      </div>

      <div className="w-full max-w-6xl relative flex items-center justify-center mt-8">
        <Image
          src={hrLine1}
          alt=""
          className="absolute w-full h-auto opacity-80"
          width={1200}
          height={2}
        />
        <div className="flex items-center justify-center gap-8 px-10 bg-[#0D203B] z-10">
          <a
            href="https://www.facebook.com/taxque.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            className="flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out bg-black hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          >
            <Image
              src={facebookIcon}
              alt="Facebook"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://twitter.com/taxque_in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Twitter page"
            className="flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out bg-black hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          >
            <Image src={xIcon} alt="Twitter" width={24} height={24} />
          </a>
          <a
            href="https://www.instagram.com/taxque.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
            className="flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out bg-black hover:scale-110 hover:bg-gray-800 hover:shadow-lg"
          >
            <Image
              src={instagramIcon}
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>

      <p className="text-sm text-gray-300 mt-8 text-center py-4">
        Copyright © 2025 TaxQue. All rights reserved.
      </p>
    </footer>
  );
}