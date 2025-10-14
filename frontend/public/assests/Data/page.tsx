"use client";

// Service Icons (use public paths)
const gstIcon = "/assests/images/gstIcon.svg";
const ITSIcon = "/assests/images/ITSIcon.svg";
const ROCIcon = "/assests/images/ROCicon.svg";
const BRIcon = "/assests/images/BRIcon.svg";
const ITNIcon = "/assests/images/ITNIcon.svg";
const PTFIcon = "/assests/images/PTFIcon.svg";
const ITRFIcom = "/assests/images/ITRFIcon.svg";
const TPSIcon = "/assests/images/TPSIcon.svg";
const HPTIcon = "/assests/images/HPTIcon.svg";

// Service Images (use public paths)
const GSTImg = "/assests/images/GSTCardImg.png";
const ITSImg = "/assests/images/ITSCardImg.png";
const ROCImg = "/assests/images/ROCCardImg.png";
const BRImg = "/assests/images/BRCardImg.png";
const ITNImg = "/assests/images/ITNIimg.png";
const PTFImg = "/assests/images/PTFImg.png";
const ITRFImg = "/assests/images/ITRFImg.png";
const TPSImg = "/assests/images/TPSImg.png";
const HPTImg = "/assests/images/HPTImg.png";

// Feature Icons (use public paths)
const expertIcon = "/assests/images/ExpertIcon.svg";
const tailoredIcon = "/assests/images/tailoredIcon.svg";
const timelyIcom = "/assests/images/timelyIcon.svg";
const securityIcon = "/assests/images/securityIcon.svg";

// Asset Images - Using placeholder images from existing assets (use public paths)
const IncomeTaxServices = "/assests/images/ITSCardImg.png";
const gst = "/assests/images/GSTCardImg.png";
const StartupServices = "/assests/images/TaxQueImg.png";
const ComplianceServices = "/assests/images/ROCCardImg.png";
const MCA = "/assests/images/BRCardImg.png";
const Registrations = "/assests/images/PTFImg.png";
const IPR = "/assests/images/ITRFImg.png";
const Accounting = "/assests/images/HPTImg.png";

// Enhanced interfaces
interface ServiceDataType {
  icon: string;
  img: any;
  title: string;
  summery: string;
}

interface TaxQueDataType {
  icon: string;
  title: string;
  summery: string;
}

interface ParaType {
  title: string;
  id: string;
}

interface CategoryListProps {
  title: string;
  summary: string;
  img: any;
}

// Services Data
export const servicesData: ServiceDataType[] = [
  {
    icon: gstIcon,
    img: GSTImg,
    title: "GST Compliance And Filing",
    summery: "Stay on top of your GST obligations with our comprehensive compliance solutions. We handle all GST-related filings, returns, and ensure you meet all regulatory requirements.",
  },
  {
    icon: ITSIcon,
    img: ITSImg,
    title: "Income Tax Services",
    summery: "We provide end-to-end solutions for your income tax needs, including ITR filing, tax planning, and compliance support for individuals and businesses.",
  },
  {
    icon: ROCIcon,
    img: ROCImg,
    title: "ROC Compliance",
    summery: "Our experts ensure that your company meets all ROC requirements, including annual filings, compliance reports, and regulatory submissions.",
  },
  {
    icon: BRIcon,
    img: BRImg,
    title: "Business Registration",
    summery: "Starting a new business? Let us handle the legal formalities for you. We provide comprehensive business registration services.",
  },
  {
    icon: ITNIcon,
    img: ITNImg,
    title: "Income Tax Notice",
    summery: "You don't need to stress over it. TaxQue is here to help you respond to income tax notices and resolve any tax-related issues.",
  },
  {
    icon: PTFIcon,
    img: PTFImg,
    title: "Professional Tax Filing",
    summery: "Are you struggling with the complex and time-consuming professional tax filing process? We make it simple and efficient.",
  },
  {
    icon: ITRFIcom,
    img: ITRFImg,
    title: "Income Tax Returns filing",
    summery: "Filing income tax is always considered a complex process. However, it is not as tedious as it sounds. The Income Tax Department is rigorously working to make the filing process smooth and easy.",
  },
  {
    icon: TPSIcon,
    img: TPSImg,
    title: "Tax Planning & Saving",
    summery: "Tax Planning Optimizer is an effective tool that helps you maximize your tax savings. You can plan your investments and save taxes using recommendations provided by the tool.",
  },
  {
    icon: HPTIcon,
    img: HPTImg,
    title: "House Property tax",
    summery: "Owning a house is a dream of many, and we all save to fulfill this dream. However, owning a house property comes with tax compliance requirements.",
  },
];

// TaxQue Features Data
export const TaxQueData: TaxQueDataType[] = [
  {
    icon: expertIcon,
    title: "Unmatched Expertise",
    summery: "Our team of seasoned professionals delivers deep knowledge in accounting, taxation, and legal services",
  },
  {
    icon: tailoredIcon,
    title: "Customer-Centric Approach",
    summery: "We prioritize your needs with personalized support and prompt responses.",
  },
  {
    icon: timelyIcom,
    title: "Nationwide Reach",
    summery: "Serving clients across India, we understand both local and national compliance requirements",
  },
  {
    icon: securityIcon,
    title: "Technology-Driven",
    summery: "Our secure, user-friendly platform ensures seamless and efficient service delivery.",
  },
  {
    icon: expertIcon,
    title: "Affordable & Transparent",
    summery: "We provide high-value services at competitive prices with no hidden costs",
  },
];

// Paragraph Section Data
export const ParaSection: ParaType[] = [
  {
    title: "Overview",
    id: "overview",
  },
  {
    title: "Private Limited Company",
    id: "PrivateLimitedCompany",
  },
  {
    title: "Key Features",
    id: "Keyfeatures",
  },
  {
    title: "Benefits",
    id: "Benefits",
  },
  {
    title: "Difference",
    id: "Difference",
  },
  {
    title: "Documents Required",
    id: "DocumentsRequired",
  },
  {
    title: "MCA Compliance",
    id: "MCACompliance",
  },
  {
    title: "FAQ's",
    id: "FAQ",
  },
];

// Main Category List
export const MainCategoryList: CategoryListProps[] = [
  {
    img: ComplianceServices,
    title: "Compliance Services",
    summary: "Helping new businesses launch and grow with expert guidance, legal compliance, funding support, and strategic planning. Simplify your startup journey with TaxQue"
  },
  {
    img: MCA,
    title: "MCA Services",
    summary: "Efficient and accurate compliance solutions for all your Ministry of Corporate Affairs (MCA) filings. Stay updated, stay compliant with TaxQue"
  },
  {
    img: Registrations,
    title: "Registrations",
    summary: "Efficient and accurate compliance solutions for all your Ministry of Corporate Affairs (MCA) filings. Stay updated, stay compliant with TaxQue"
  },
  {
    title: "Income Tax Services",
    summary: "Simplify your Income Tax Return (ITR) filing with TaxQue! Our platform guides you step-by-step through the process, whether you are a salaried employee, self-employed, or a business owner. We help you choose the right ITR form, compile necessary documents (like Form 16 and bank statements), and file your return online or offline. Stay compliant and claim every eligible deduction with our expert support.",
    img: IncomeTaxServices
  },
  {
    img: gst,
    title: "Goods and Services Tax (GST)",
    summary: "Simplify your Income Tax Return (ITR) filing with TaxQue! Our platform guides you step-by-step through the process, whether you are a salaried employee, self-employed, or a business owner. We help you choose the right ITR form, compile necessary documents (like Form 16 and bank statements), and file your return online or offline. Stay compliant and claim every eligible deduction with our expert support."
  },
  {
    img: StartupServices,
    title: "Startup Services",
    summary: "Helping new businesses launch and grow with expert guidance, legal compliance, funding support, and strategic planning. Simplify your startup journey with TaxQue"
  },
  {
    img: IPR,
    title: "Intellectual Property Rights (IPR)",
    summary: "Protect your innovations and creative assets with expert IPR services. From patents to trademarks, TaxQue helps you secure and manage your intellectual property."
  },
  {
    img: Accounting,
    title: "Accounting",
    summary: "Protect your innovations and creative assets with expert IPR services. From patents to trademarks, TaxQue helps you secure and manage your intellectual property."
  },
];

// Blog Category List
export const BlogCategoryList: string[] = [
  "Income Tax",
  "TDS Compliance",
  "Goods and Service Tax",
  "Updates",
  "Business",
  "Registration",
  "Private Company",
  "Section 8 Company",
  "LLP",
  "ROC Filings",
  "Compliance",
  "Finance",
  "Accounting & Bookkeeping",
  "Trademark",
  "Copyright",
  "Import & Export",
  "Tools",
];

// Export types for use in other components
export type { ServiceDataType, TaxQueDataType, ParaType, CategoryListProps };