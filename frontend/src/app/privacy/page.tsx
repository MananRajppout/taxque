"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images
const smPageBG = "/assests/images/smPageBG.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = React.useState("Privacy Policy");

  const openMail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      
      <div className="bg-white">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      </div>

      <div className="px-4 md:px-8 lg:px-16 pt-20 pb-8 md:pb-12 lg:pb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-left text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 text-left leading-relaxed mb-12">
            This Privacy Policy ("Policy") governs how TaxQue by ARB FinTech LLP
            ("TaxQue," "we," "our," or "us") collects, uses, stores, processes,
            and discloses information collected from users ("Users," "you," or
            "your") of the TaxQue website, mobile applications, and services
            (collectively, the "Platform"). This Policy applies to all products,
            services, and features offered by TaxQue and forms an integral part of
            our Terms and Conditions. By using the Platform, you consent to the
            data practices described in this Policy.
          </p>

          {/* Information We Collect */}
          <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                We collect information to provide, improve, and personalize our
                services. Information is collected in the following categories:
              </li>
              <li>
                <strong>Personal Information:</strong> We collect personal identification
                information that you voluntarily provide when interacting with the
                Platform, such as:
              </li>
              <li className="ml-4">
                • Name, email address, phone number, mailing address, and date of birth.
              </li>
              <li className="ml-4">
                • Financial details, including GSTIN, PAN, bank account information,
                or payment details for tax filings or transactions.
              </li>
              <li className="ml-4">
                • Government-issued identification (e.g., Aadhaar number, if
                required for compliance, subject to applicable laws).
              </li>
              <li className="ml-4">
                • Login credentials (e.g., username, password) for Platform access.
                This information is collected during registration, service
                requests, payment processing, customer support interactions, or
                other activities on the Platform.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> We collect non-personal
                information automatically when you interact with the Platform,
                including:
              </li>
              <li className="ml-4">
                • Device information (e.g., device type, operating system, browser
                type, IP address).
              </li>
              <li className="ml-4">
                • Usage data (e.g., pages visited, features used, time spent on the
                Platform).
              </li>
              <li className="ml-4">
                • Technical details (e.g., internet service provider, referral URLs,
                clickstream data).
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong>
              </li>
              <li className="ml-4">
                • The Platform uses cookies, web beacons, and similar technologies
                to enhance user experience, track usage, and improve services.
              </li>
              <li className="ml-4">
                • Cookies may store session data, preferences, or analytics
                information.
              </li>
              <li className="ml-4">
                • You can manage cookie preferences through your browser settings,
                but disabling cookies may limit access to certain Platform
                features.
              </li>
              <li>
                <strong>Third-Party Data:</strong> We may receive information about you
                from third parties, such as government portals (e.g., GSTN, MCA),
                payment gateways, or analytics providers, to facilitate services
                or comply with legal obligations.
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="w-full bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>TaxQue uses collected information for the following purposes:</li>
              <li>
                <strong>Service Delivery:</strong> To process tax filings, compliance
                requests, financial transactions, and other services you request
              </li>
              <li>
                <strong>Account Management:</strong> To create, maintain, and secure your
                account, including authentication and password recovery.
              </li>
              <li>
                <strong>Customer Support:</strong> To respond to inquiries, resolve issues,
                and provide assistance via email, phone, or chat.
              </li>
              <li>
                <strong>Personalization:</strong> To tailor content, recommendations, and
                user experience based on your preferences and usage patterns.
              </li>
              <li>
                <strong>Platform Improvement:</strong> To analyze usage trends, monitor
                performance, and enhance Platform functionality and services.
              </li>
              <li>
                <strong>Communication:</strong> To send transactional emails (e.g.,
                service updates, payment confirmations), respond to inquiries, or
                provide company news, promotions, or surveys (with your consent,
                where required).
              </li>
              <li>
                <strong>Compliance and Legal Obligations:</strong> To comply with
                applicable laws, regulations, or government requests (e.g., tax
                audits, KYC requirements).
              </li>
              <li>
                <strong>Fraud Prevention:</strong> To detect, prevent, and investigate
                fraudulent or unauthorized activities on the Platform.
              </li>
            </ul>
          </div>

          {/* How We Share Your Information */}
          <div className="w-full bg-green-50 border-l-4 border-green-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              How We Share Your Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                We do not sell, trade, or rent your personal information to third
                parties. However, we may share information in the following cases:
              </li>
              <li>
                <strong>Service Providers:</strong> With trusted third-party vendors (e.g.,
                payment gateways, cloud storage providers, analytics tools) who
                assist in operating the Platform or delivering services, under
                strict confidentiality agreements.
              </li>
              <li>
                <strong>Government Authorities:</strong> With regulatory bodies (e.g.,
                GSTN, Income Tax Department, MCA) to process filings, comply with
                legal obligations, or respond to lawful requests from law
                enforcement or courts.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition,
                or sale of assets, your information may be transferred to the
                acquiring entity, subject to equivalent privacy protections.
              </li>
              <li>
                <strong>Aggregated Data:</strong> We may share anonymized or aggregated
                data (e.g., usage statistics) with partners or for research
                purposes, ensuring it cannot be linked to you.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information for other
                purposes if you provide explicit consent (e.g., for marketing
                campaigns or surveys).
              </li>
            </ul>
          </div>

          {/* Data Protection Rights */}
          <div className="w-full bg-purple-50 border-l-4 border-purple-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Your Data Protection Rights
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                Under applicable Indian laws, including the Digital Personal Data
                Protection Act, 2023, you have the following rights:
              </li>
              <li>
                <strong>Access:</strong> Request details of the personal information we hold
                about you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete
                information.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information,
                subject to legal retention obligations.
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing for specific
                purposes.
              </li>
              <li>
                <strong>Data Portability:</strong> Request a copy of your data in a
                structured, machine-readable format.
              </li>
              <li>
                <strong>Objection:</strong> Object to processing for marketing or
                non-essential purposes.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent for data processing
                (where consent is the basis), without affecting prior lawful
                processing.
              </li>
              <li>
                To exercise these rights, contact us at{" "}
                <a 
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800" 
                  onClick={() => openMail("info@taxque.in")}
                >
                  info@taxque.in
                </a>
                . Requests will be processed within 30 days, subject to verification and
                legal requirements.
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full bg-gray-50 border-l-4 border-gray-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                For questions, feedback, or concerns about this Privacy Policy or
                our data practices, please contact:
              </li>
              <li>
                <strong>TaxQue by ARB FinTech LLP</strong>
              </li>
              <li>
                <strong>Contact Person:</strong> Md Afzal
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a 
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800" 
                  onClick={() => openMail("info@taxque.in")}
                >
                  info@taxque.in
                </a>
              </li>
              <li>
                <strong>Address:</strong> Surbhi Vihar, Mithapur, Patna, Bihar 800001, India
              </li>
              <li>
                <strong>Effective Date:</strong> January 20, 2025
              </li>
            </ul>
          </div>
      </div>

      <Footer />
    </div>
  );
}
