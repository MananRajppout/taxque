"use client";

import React, { useState } from "react";
import Image from "next/image";
import "@/lib/style.css";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactUsPage() {
  const [currentNav, setCurrentNav] = useState("Contact Us");

  const openMail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="contactPage">
      {/* Hero Section */}
      <div className="subPageHeroSection">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        <div className="pageBg">
          <Image
            src="/assests/images/otherPageBg.svg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <p className="navigateText">
          <span onClick={() => window.location.href = "/"} className="navHomeT cursor-pointer">
            Home
          </span>
          <span className="navSeparator"> &gt; </span>
          <span className="navPageT">Contact Us</span>
        </p>

        <p className="hrMainText">Feel Free To Get In Touch</p>
      </div>

      {/* Main Contact Section */}
      <div className="contactMainSection">
        <div className="contactInfoBox">
          <p className="contactHeader">
            We provide expert support for all your tax and accounting needs —
            contact us!
          </p>
          <p className="contactSubHeader">
            At TaxQue, we're here to make tax and accounting simple,
            efficient, and stress-free for you. Whether you have inquiries
            about GST, Income Tax, ROC Compliance, or business registrations,
            our team of experts is ready to assist you. We're committed to
            helping your business stay compliant and financially healthy.
            Let's work together for your success!
          </p>

          <div className="hrLine"></div>
          
          <div className="contact_Box">
            <Image src="/assests/images/callIcon.svg" alt="Phone" width={20} height={20} />
            <p>+91 9876543210</p>
          </div>
          <div className="contact_Box">
            <Image src="/assests/images/callIcon.svg" alt="Phone" width={20} height={20} />
            <p>+91 9876543211</p>
          </div>
          <div className="contact_Box">
            <Image src="/assests/images/messageIcon.svg" alt="Email" width={20} height={20} />
            <button
              onClick={() => openMail("support@taxque.in")}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              support@taxque.in
            </button>
          </div>
          <div className="contact_Box">
            <Image src="/assests/images/messageIcon.svg" alt="Email" width={20} height={20} />
            <button
              onClick={() => openMail("info@taxque.in")}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              info@taxque.in
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contactBox">
          <p className="contactHeader">We're Here To Get In Touch</p>

          <div className="BoxInput">
            <input
              placeholder="Full Name"
              type="text"
            />
            <Image className="inputUserIcon" src="/assests/images/inputUserIcon.svg" alt="User" width={11} height={11} />
          </div>
          
          <div className="BoxInput">
            <input
              placeholder="Email Address"
              type="email"
            />
            <Image className="inputMailIcon" src="/assests/images/inputMailIcon.svg" alt="Email" width={16} height={16} />
          </div>
          
          <div className="BoxInput">
            <input
              placeholder="Phone Number"
              type="tel"
            />
            <Image className="inputMailIcon" src="/assests/images/inputPhoneIcon.svg" alt="Phone" width={16} height={16} />
          </div>

          <div className="BoxInput">
            <input
              type="text"
              placeholder="Enter your message"
            />
            <Image className="inputMailIcon" src="/assests/images/messageIcon.svg" alt="Message" width={16} height={16} />
          </div>

          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
            style={{ width: "150px", height: "40px" }}
          >
            Submit Now
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="mapOverBox">
        <div className="mapBox">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.123456789!2d85.123456789!3d25.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzI0LjQiTiA4NcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}
