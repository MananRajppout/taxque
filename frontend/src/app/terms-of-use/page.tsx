"use client";

import React, { useState } from "react";


import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const openMail = (email: string) => {
  window.location.href = `mailto:${email}`;
};

export default function TermsOfUse() {
  const [currentNav, setCurrentNav] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      
      <div className="px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 sm:text-4xl lg:text-5xl">
          Terms and Conditions
        </h1>
        
        <p className="text-base text-gray-700 leading-relaxed mb-8 sm:text-lg">
          These Terms and Conditions ("Terms") govern the use of the TaxQue
          platform, website ("Site"), mobile applications, and services provided
          by ARB FinTech LLP ("TaxQue," "we," "our," or "us"). By accessing our
          Site, using our services, or registering an account, you ("User,"
          "you," or "your") agree to be bound by these Terms and our Privacy
          Policy. If you do not agree with these Terms, you must immediately
          cease using our platform and services.
        </p>

       
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            General Provisions
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Business Overview:</strong> TaxQue, operated by ARB FinTech LLP, is
              a technology-driven platform providing tax, compliance, and
              financial services, including but not limited to Goods and
              Services Tax (GST) filings, income tax return preparation, company
              incorporation, accounting, and regulatory compliance assistance.
            </li>
            <li>
              <strong>Applicability:</strong> These Terms apply to all Users, including individuals, businesses,
              or entities accessing our Site, mobile applications, or services,
              whether through free or paid plans.
            </li>
            <li>
              <strong>Tax Compliance:</strong> All fees charged by TaxQue are subject to Goods and Services Tax
              (GST) as per Indian tax laws. GST invoices and Input Tax Credit
              (ITC) will be provided upon submission of a valid GSTIN at the
              time of payment.
            </li>
            <li>
              <strong>Government Fees:</strong> Fees, levies, or charges imposed by government authorities for
              specific services (e.g., filing fees, stamp duties) will be
              communicated upfront, charged separately, and remitted to the
              respective authorities on your behalf.
            </li>
            <li>
              <strong>Amendments to Terms:</strong> TaxQue reserves the right to modify these Terms at any time.
              Revised Terms will be posted on the Site and communicated via
              email or platform notifications. Continued use of our services
              after such changes constitutes acceptance of the updated Terms.
            </li>
            <li>
              <strong>Service Availability:</strong> Services are available to Users in India and, where applicable, to
              non-residents subject to compliance with Indian laws and
              regulations. TaxQue may restrict access to certain services based
              on geographic or regulatory limitations.
            </li>
          </ul>
        </div>

   
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Use of the Platform
          </h2>
          <p className="text-gray-700 mb-4">
            By accessing or using the TaxQue platform, you agree to the following:
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Eligibility:</strong> You must be at least 18 years old and legally
              capable of entering into contracts under Indian law to use our
              services. Businesses or entities must be duly registered and
              authorized to avail of our services.
            </li>
            <li>
              <strong>Accurate Information:</strong> Provide accurate, complete, and
              up-to-date information during registration and throughout your use
              of our services. You are responsible for updating your account
              details, including contact information, GSTIN, and payment
              details, as needed.
            </li>
            <li>
              <strong>Account Security:</strong> You are responsible for:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Maintaining the confidentiality of your login credentials (username, password, OTPs, etc.)</li>
                <li>• Ensuring all activities under your account are authorized</li>
                <li>• Notifying TaxQue immediately at{" "}
                  <button
                    onClick={() => openMail("info@taxque.in")}
                    className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    info@taxque.in
                  </button>{" "}
                  of any unauthorized access, security breach, or suspicious activity
                </li>
                <li>• TaxQue is not liable for losses resulting from your failure to secure your account</li>
              </ul>
            </li>
            <li>
              <strong>Prohibited Activities:</strong> You agree not to:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Engage in unauthorized, unethical, or illegal activities, including hacking, phishing, data mining, or attempting to bypass platform security measures</li>
                <li>• Use automated tools (e.g., bots, scrapers) to access, extract, or manipulate platform resources</li>
                <li>• Share, duplicate, resell, or distribute TaxQue's services, tools, or resources without prior written consent</li>
                <li>• Use the platform to facilitate money laundering, tax evasion, or other illegal financial activities</li>
                <li>• Overload or disrupt the platform's functionality (e.g., through denial-of-service attacks)</li>
              </ul>
            </li>
            <li>
              <strong>Compliance with Laws:</strong> You must comply with all applicable Indian laws, including but not limited to the Income Tax Act, 1961, GST Act, 2017, and the Information Technology Act, 2000, while using our platform.
            </li>
            <li>
              <strong>Consequences of Violation:</strong> Non-compliance with these guidelines may result in:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Immediate suspension or termination of your account</li>
                <li>• Legal action, including claims for damages</li>
                <li>• Reporting to relevant authorities for illegal activities</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* User Responsibilities and Conduct */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            User Responsibilities and Conduct
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Accuracy of Information:</strong> You are solely responsible for
              the accuracy, completeness, and timeliness of all information,
              documents, and data provided to TaxQue for service delivery.
              Errors, omissions, or delays in providing information may result
              in service delays, additional fees, or rejection by government
              authorities.
            </li>
            <li>
              <strong>Service Scope:</strong> TaxQue's obligations are limited to
              delivering services as per the agreed scope, based on the
              information and instructions you provide. We are not responsible
              for outcomes resulting from incomplete or inaccurate submissions.
            </li>
            <li>
              <strong>Content Guidelines:</strong> You agree not to post, upload, or
              share content through TaxQue's communication tools (e.g., chat,
              email, or forms) that is:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Illegal, fraudulent, or misleading</li>
                <li>• Offensive, defamatory, or harmful to others</li>
                <li>• Infringing on intellectual property, privacy, or other rights</li>
              </ul>
            </li>
            <li>
              <strong>Tax and Legal Compliance:</strong> You are responsible for ensuring
              your tax filings, compliance activities, and financial
              transactions comply with applicable laws. TaxQue provides tools
              and services to facilitate compliance but does not assume
              liability for your legal obligations.
            </li>
            <li>
              <strong>Backup of Data:</strong> You are responsible for maintaining
              backups of all documents and data submitted to TaxQue. While we
              employ robust security measures, we are not liable for data loss
              due to unforeseen events.
            </li>
          </ul>
        </div>

        {/* Cancellations and Refunds */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Cancellations and Refunds
          </h2>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Cancellation Policy:</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              Cancellation requests must be submitted in writing to{" "}
              <button
                onClick={() => openMail("info@taxque.in")}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                info@taxque.in
              </button>{" "}
              before service processing begins
            </li>
            <li>
              A cancellation fee of 20% of the service fee (excluding government
              fees and taxes) will be deducted.
            </li>
            <li>
              No cancellations are permitted once service processing has commenced.
            </li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Refund Process:</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              Approved refunds will be processed within 4-5 weeks from the date
              of approval, subject to deductions for cancellation fees, taxes,
              and non-refunded government charges.
            </li>
            <li>
              Refunds will be issued via the original payment method or as
              agreed with TaxQue.
            </li>
          </ul>

          <h3 className="text-lg font-medium text-gray-800 mb-3 mt-6">Non-Refundable Cases:</h3>
          <p className="text-gray-700 mb-3">No refunds will be provided for:</p>
          <ul className="space-y-4 text-gray-700">
            <li>Services already processed, completed, or submitted to government authorities</li>
            <li>Government fees, levies, or charges remitted to authorities</li>
            <li>Delays, rejections, or issues caused by government platforms, third-party systems, or user errors</li>
            <li>Force majeure events, including natural disasters, cyberattacks, or government restrictions</li>
            <li>
              <strong>Discretionary Refunds:</strong> TaxQue may, at its sole discretion,
              offer partial refunds or credits in exceptional cases, subject to
              review.
            </li>
          </ul>
        </div>

        {/* Intellectual Property Rights */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Intellectual Property Rights
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Ownership:</strong> All content, materials, tools, software, templates, and resources
              on the TaxQue platform, including text, graphics, logos, and
              proprietary algorithms, are the exclusive property of ARB FinTech
              LLP and are protected by Indian and international intellectual
              property laws, including the Copyright Act, 1957, and Trademarks
              Act, 1999.
            </li>
            <li>
              <strong>Restrictions:</strong> You may not:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Copy, reproduce, modify, distribute, or create derivative works from TaxQue's intellectual property without prior written consent</li>
                <li>• Reverse-engineer, decompile, or attempt to extract the platform's source code or algorithms</li>
                <li>• Use TaxQue's brand, logo, or trademarks for commercial purposes without authorization</li>
              </ul>
            </li>
            <li>
              <strong>User Content:</strong> Any data, documents, or content you submit to
              TaxQue remains your property. By submitting such content, you
              grant TaxQue a non-exclusive, royalty-free, worldwide license to
              use, process, store, and transmit it solely for the purpose of
              delivering the requested services and complying with legal
              obligations.
            </li>
            <li>
              <strong>Feedback:</strong> Any feedback, suggestions, or ideas you provide
              about the platform or services may be used by TaxQue without
              obligation or compensation to you.
            </li>
          </ul>
        </div>

        {/* Privacy and Data Protection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Privacy and Data Protection
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Privacy Policy:</strong> Our Privacy Policy, available on the Site, governs the collection,
              use, storage, and protection of your personal and financial data.
              By using our platform, you consent to the data practices outlined
              therein.
            </li>
            <li>
              <strong>Data Security:</strong> TaxQue employs industry-standard encryption,
              firewalls, and security protocols to safeguard your data. However,
              no system is entirely immune to risks, and you assume
              responsibility for securing your account credentials and devices.
            </li>
            <li>
              <strong>Data Sharing:</strong> TaxQue may share your data with:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Government authorities or regulatory bodies as required for service delivery (e.g., GSTN, MCA, Income Tax Department)</li>
                <li>• Third-party service providers (e.g., payment gateways, cloud storage) under strict confidentiality agreements</li>
                <li>• Law enforcement or courts in response to legal requests or investigations</li>
              </ul>
            </li>
            <li>
              <strong>Data Retention:</strong> We retain your data only for
              as long as necessary to deliver services, comply with legal
              obligations, or resolve disputes, as detailed in the Privacy
              Policy.
            </li>
          </ul>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Limitation of Liability
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Scope of Liability:</strong> TaxQue's liability for any claim arising from our services is
              limited to the amount of fees paid for the specific service in
              question.
            </li>
            <li>
              <strong>Exclusions:</strong> TaxQue is not liable for any direct, indirect,
              incidental, consequential, or punitive damages, including but not
              limited to:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Losses due to inaccurate, incomplete, or delayed information provided by you</li>
                <li>• Delays, errors, or rejections on government platforms or third-party systems</li>
                <li>• Legal, financial, or regulatory outcomes beyond our control (e.g., tax assessments, penalties)</li>
                <li>• Data loss, security breaches, or service interruptions caused by force majeure events, cyberattacks, or user negligence</li>
              </ul>
            </li>
            <li>
              <strong>No Warranty:</strong> Services are provided on an "as-is" and
              "as-available" basis. TaxQue does not guarantee:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Uninterrupted or error-free access to the platform</li>
                <li>• Specific outcomes from services (e.g., tax refunds, compliance approvals)</li>
                <li>• Accuracy of third-party data or government platform performance</li>
              </ul>
            </li>
            <li>
              <strong>Indemnity:</strong> You agree to indemnify, defend, and hold
              TaxQue, its affiliates, employees, and partners harmless from any
              claims, losses, damages, or liabilities arising from:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Your breach of these Terms or applicable laws</li>
                <li>• Misuse of the platform or services</li>
                <li>• Inaccurate or fraudulent information provided by you</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Termination of Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Termination of Services
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Termination by TaxQue:</strong> We may suspend or terminate your
              access to the platform and services, with or without notice, if
              you:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Breach these Terms or engage in illegal, unethical, or fraudulent activities</li>
                <li>• Fail to make timely payments for services</li>
                <li>• Misuse, disrupt, or attempt to harm the platform, its users, or third parties</li>
                <li>• Provide false, misleading, or fraudulent information</li>
              </ul>
            </li>
            <li>
              <strong>Termination by User:</strong> You may terminate your account by
              contacting{" "}
              <button
                onClick={() => openMail("info@taxque.in")}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                info@taxque.in
              </button>
              . Termination does not relieve you of obligations to pay
              outstanding fees or comply with these Terms.
            </li>
            <li>
              <strong>Effect of Termination:</strong> Upon termination:
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Your access to the platform and services ceases immediately</li>
                <li>• No refunds will be issued for terminated services or unused portions of subscriptions</li>
                <li>• TaxQue may retain your data as required by law or for record-keeping purposes, as outlined in the Privacy Policy</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Governing Law and Dispute Resolution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Governing Law and Dispute Resolution
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Applicable Law:</strong> These Terms are governed by and construed
              in accordance with the laws of India.
            </li>
            <li>
              <strong>Jurisdiction:</strong> Any disputes arising from these Terms or your
              use of our services shall be subject to the exclusive jurisdiction
              of the courts in Patna, Bihar, India.
            </li>
            <li>
              <strong>Dispute Resolution:</strong>
              <ul className="mt-2 ml-4 space-y-2">
                <li>• Both parties agree to attempt resolution through good-faith negotiations for at least 30 days before pursuing legal action</li>
                <li>• If negotiations fail, disputes may be resolved through arbitration in Patna, Bihar, under the Arbitration and Conciliation Act, 1996, at TaxQue's discretion</li>
              </ul>
            </li>
            <li>
              <strong>Class Action Waiver:</strong> You agree to resolve disputes individually and not as part of a class action or collective proceeding.
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Contact Information
          </h2>
          <p className="text-gray-700 mb-4">
            For queries, feedback, grievances, or support, please contact:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li><strong>TaxQue by ARB FinTech LLP</strong></li>
            <li><strong>Contact Person:</strong> Md Afzal</li>
            <li>
              <strong>Email:</strong>{" "}
              <button
                onClick={() => openMail("info@taxque.in")}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                info@taxque.in
              </button>
            </li>
            <li><strong>Address:</strong> Surbhi Vihar, Mithapur, Patna, Bihar 800001, India</li>
            <li>
              <strong>Grievance Redressal:</strong> Grievances will be addressed within
              7-14 business days. Escalated issues may be referred to our
              compliance team.
            </li>
          </ul>
        </div>

        {/* Miscellaneous */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl">
            Miscellaneous
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Entire Agreement:</strong> These Terms, along with the Privacy
              Policy and any service-specific agreements, constitute the entire
              agreement between you and TaxQue regarding the use of our platform
              and services.
            </li>
            <li>
              <strong>Severability:</strong> If any provision of these Terms is found to
              be invalid or unenforceable, the remaining provisions remain in
              full force and effect.
            </li>
            <li>
              <strong>Waiver:</strong> No waiver of any term by TaxQue shall be deemed a
              continuing waiver of such term or any other term.
            </li>
            <li>
              <strong>Force Majeure:</strong> TaxQue is not liable for failure to perform
              its obligations due to events beyond its reasonable control,
              including natural disasters, cyberattacks, government actions, or
              third-party system failures.
            </li>
            <li>
              <strong>Assignment:</strong> You may not assign your rights or obligations
              under these Terms without TaxQue's prior written consent. TaxQue
              may assign its rights or obligations to affiliates or successors
              without notice.
            </li>
            <li>
              <strong>Notices:</strong> All notices from TaxQue will be sent via email,
              platform notifications, or the Site. Notices from you must be sent
              to{" "}
              <button
                onClick={() => openMail("info@taxque.in")}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                info@taxque.in
              </button>
              .
            </li>
            <li>
              <strong>Third-Party Services:</strong> The platform may integrate with
              third-party services (e.g., payment gateways, government portals).
              TaxQue is not responsible for the performance, availability, or
              terms of such services.
            </li>
            <li>
              <strong>Language:</strong> These Terms are provided in English. Any
              translations are for convenience only, and the English version
              prevails in case of discrepancies.
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