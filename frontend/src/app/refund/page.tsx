"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const smPageBG = "/assests/images/smPageBG.svg";
const policyPointIcon = "/assests/images/policyPointIcon.svg";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = React.useState("Refund Policy");

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
            Refund Policy
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 text-left leading-relaxed mb-12">
            At TaxQue by ARB FinTech LLP ("TaxQue," "we," "our," or "us"), we are
            committed to delivering high-quality tax, compliance, and financial
            services through our website, mobile applications, and platform
            (collectively, the "Platform"). Our goal is to ensure User
            satisfaction with every interaction. This Refund Policy outlines the
            conditions under which refunds or service changes may be requested,
            the process for submitting requests, and circumstances where refunds
            are not applicable. This policy forms an integral part of our Terms
            and Conditions and applies to all Users ("User," "you," or "your") of
            the Platform.
          </p>

          
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Image src={policyPointIcon} alt="Policy Point" width={24} height={24} className="mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  The Refund shall be only considered in the event there is a clear,
                  visible deficiency with the service or product purchased from
                  TaxQue.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Image src={policyPointIcon} alt="Policy Point" width={24} height={24} className="mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  In the event a customer has paid for a service and then requests
                  for a refund only because there was a change in mind, the refund
                  shall not be considered as there is no fault, defect, or onus on
                  TaxQue.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Image src={policyPointIcon} alt="Policy Point" width={24} height={24} className="mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  Refund requests shall not be entertained after the work has been
                  shared with you in the event of change of mind. However, we shall
                  give you the option of using the amount paid for by you.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Image src={policyPointIcon} alt="Policy Point" width={24} height={24} className="mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  We make every effort to provide the service to you as per the
                  specifications and timelines mentioned against each service or
                  product purchased by you from TaxQue, however if, due to any
                  reason.
                </p>
              </div>
            </div>
          </div>

          
          <div className="w-full bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Our Commitment to Satisfaction
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Resolution First:</strong> If you are dissatisfied with any aspect
                of our services, we encourage you to contact us immediately. We
                will make every effort to address your concerns, resolve issues,
                or, where applicable, offer a refund or credit for future TaxQue
                services.
              </li>
              <li>
                <strong>Contact Channels:</strong> You can raise concerns by:
              </li>
              <li className="ml-4">
                • Logging into the Platform with the email address associated with
                your payment and submitting a "Not Satisfied" request under the
                relevant service engagement.
              </li>
              <li className="ml-4">
                • Emailing us at{" "}
                <a
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => openMail("info@taxque.in")}
                >
                  info@taxque.in
                </a>{" "}
                with details of your issue, including transaction ID, service
                details, and a description of the concern.
              </li>
              <li>
                <strong>Response Time:</strong> We aim to acknowledge your request within
                2-3 business days and resolve it within 7-14 business days,
                depending on the complexity of the issue.
              </li>
            </ul>
          </div>

          
          <div className="w-full bg-green-50 border-l-4 border-green-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Refund Eligibility
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>30-Day Refund Window:</strong> You may request a refund within 30
                calendar days from the date of payment for a service, subject to
                the conditions below.
              </li>
              <li>
                <strong>Service Fulfillment:</strong> TaxQue considers its service
                obligation fulfilled once:
              </li>
              <li className="ml-4">
                • You are granted access to the Platform for the requested service
                (e.g., tax filing tools, compliance dashboards).
              </li>
              <li className="ml-4">
                • The requested service is completed or submitted to the relevant
                authority (e.g., GST filing, company incorporation).
              </li>
              <li>
                <strong>Cancellation Fee:</strong> All refund requests are subject to a 20%
                cancellation fee to cover administrative and processing costs,
                unless otherwise specified.
              </li>
              <li>
                <strong>Non-Refundable Components:</strong> The following are
                non-refundable:
              </li>
              <li className="ml-4">
                • Government fees, levies, or charges (e.g., filing fees, stamp
                duties) remitted to authorities.
              </li>
              <li className="ml-4">
                • Taxes, including Goods and Services Tax (GST), applied to service
                fees.
              </li>
              <li className="ml-4">
                • Services already processed, completed, or submitted to government
                or third-party platforms.
              </li>
            </ul>
          </div>

          
          <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Change of Service
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Service Change Request:</strong> If you wish to change the service
                ordered (e.g., switch from GST filing to income tax filing), you
                must submit a request within 7 calendar days from the date of
                payment.
              </li>
              <li>
                <strong>Process:</strong> Log into the Platform and select "Get Help" to
                initiate a service change request, or email{" "}
                <a
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => openMail("info@taxque.in")}
                >
                  info@taxque.in
                </a>{" "}
                with transaction details and the desired service.
              </li>
              <li className="ml-4">
                • If approved, the original service fee (minus any non-refundable
                components) will be credited toward the new service. Additional
                fees may apply if the new service is priced higher.
              </li>
              <li>
                <strong>Limitations:</strong> Service changes are not permitted once the
                original service has been processed, completed, or submitted to a
                government authority.
              </li>
            </ul>
          </div>

          
          <div className="w-full bg-purple-50 border-l-4 border-purple-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Processing Time
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>Refund requests are reviewed within 5-7 business days</li>
              <li>
                Approved refunds are processed within 3-5 weeks from the date of
                approval, subject to verification and deduction of applicable fees
                (e.g., 20% cancellation fee, taxes, government charges).
              </li>
              <li>
                Refunds will be issued via the original payment method (e.g., bank
                transfer, UPI, card) or as agreed with TaxQue.
              </li>
              <li>
                <strong>Discretionary Refunds:</strong> In exceptional cases, TaxQue may, at
                its sole discretion, offer partial refunds, credits, or
                alternative resolutions, even if the request falls outside the
                standard eligibility criteria.
              </li>
            </ul>
          </div>

          
          <div className="w-full bg-gray-50 border-l-4 border-gray-400 rounded-lg p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                For refund requests, questions, or assistance, please contact:
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
                <strong>Grievance Officer:</strong> Md Afzal (
                <a
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => openMail("info@taxque.in")}
                >
                  info@taxque.in
                </a>
                )
              </li>
              <li>
                <strong>Response Time:</strong> Refund and grievance inquiries will be
                acknowledged within 2-3 business days and resolved within 7-14
                business days, depending on the issue.
              </li>
            </ul>
          </div>

                
          <div className="w-full bg-orange-50 border-l-4 border-orange-400 rounded-lg p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Miscellaneous
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Alignment with Terms:</strong> This Refund Policy is subject to and
                governed by our Terms and Conditions. In case of any conflict, the
                Terms and Conditions prevail.
              </li>
              <li>
                <strong>Updates:</strong> TaxQue reserves the right to update this Refund
                Policy at any time. Changes will be communicated via the Platform,
                email, or by updating the "Effective Date" below. Continued use of
                the Platform constitutes acceptance of the updated policy.
              </li>
              <li>
                <strong>Consumer Protection:</strong> This policy complies with applicable
                Indian laws, including the Consumer Protection Act, 2019, and
                related regulations.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of this policy is found to
                be invalid or unenforceable, the remaining provisions remain in
                full force and effect.
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
