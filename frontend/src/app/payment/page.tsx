"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (use public paths)
const smPageBG = "/assests/images/smPageBG.svg";
const paymentBg = "/assests/images/paymentBg.svg";
const GreenTik = "/assests/images/GreenTik.svg";
const rightArrow = "/assests/images/rightArrow.svg";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";
import MyCarousel from "@/components/Carousel";
import Subscribe from "@/components/Subscribe";
import { DropBox } from "@/components/Tools";
import ContactSection from "@/components/ContactSection";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { GetUser } from "@/store/slices/userSlice";
import { FetchService } from "@/store/slices/serviceSlice";

export default function PaymentCheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.service);
  const categoryDB = useSelector((state: RootState) => state.category);
  const user = useSelector((state: RootState) => state.user);
  const [currentNav, setCurrentNav] = React.useState("Payment");

  const [currentPriceData, setCurrentPriceData] = useState<any>();
  const [featureView, setFeatureView] = useState(false);
  const [Product, setProduct] = useState<any>();
  const [planDrop, setPlanDrop] = useState<string>();

  // Mock data for demonstration
  const mockProduct = {
    _id: "mock-product-id",
    title: "ECA Assisted - Standard",
    priceData: [
      {
        _id: "plan-1",
        title: "Basic Plan",
        price: "2,999",
        basicPrice: "3,999",
        fetures: [
          "GST Registration",
          "Monthly GST Filing",
          "Annual Return Filing",
          "Tax Consultation",
          "Document Support",
          "Email Support"
        ]
      },
      {
        _id: "plan-2", 
        title: "Premium Plan",
        price: "4,999",
        basicPrice: "6,999",
        fetures: [
          "Everything in Basic",
          "Income Tax Filing",
          "TDS Compliance",
          "ROC Filings",
          "Priority Support",
          "Phone Support"
        ]
      }
    ]
  };

  const planArray = Product?.priceData?.map((val: any) => val.title) || [];
  const [userId, setUserId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const amount = currentPriceData?.price?.replace(/,/g, "") ?? "0";
  const [serviceName, setServiceName] = useState<string>("");


  useEffect(() => {
    setUserId(window.localStorage.getItem("userId") || "");
    setServiceId(window.localStorage.getItem("planServiceId") || "");
    setServiceName(window.localStorage.getItem("planServiceName") || "Tax Service");
  }, []);

  const handleBuy = async () => {
    try {
      // Mock payment integration - replace with actual Razorpay integration
      const mockOrder = {
        id: "mock-order-id",
        amount: parseInt(amount) * 100, // Convert to paise
        currency: "INR"
      };

      // Mock payment success
      setTimeout(() => {
        alert("Payment Successful!");
        router.push("/user-profile");
      }, 1000);

    } catch (error) {
      console.error("Payment failed to initialize:", error);
      alert("Something went wrong while initiating the payment.");
    }
  };

  // Handle change plan
  useEffect(() => {
    if (!Product?.priceData?.length) return;
    const initialData = Product.priceData.find((pd: any) => pd._id === "plan-1");
    if (!initialData) {
      return;
    }
    setCurrentPriceData(initialData);
  }, [Product?.priceData]);

  useEffect(() => {
    if (!Product?.priceData?.length) return;
    const updatedData = Product.priceData.find((pd: any) => pd.title === planDrop);
    if (!updatedData) {
      return;
    }
    setCurrentPriceData(updatedData);
  }, [planDrop, Product?.priceData]);

  useEffect(() => {
    setProduct(mockProduct);
  }, []);

  useEffect(() => {
    if (!userId) return;
    dispatch(GetUser({ _id: userId }));
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(FetchService());
  }, [dispatch]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image */}
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
      </div>

      {/* Payment Main Section */}
      <div className="w-full relative flex flex-col items-center">
        {/* Background Image */}
        <Image src={paymentBg} alt="Payment Background" className="absolute top-0 left-0 w-full h-full -z-10 object-cover" fill />
        
        {/* Payment Checkout Box */}
        <div className="w-full max-w-6xl mx-auto mt-12 px-4">
          <div className="w-full bg-white rounded-3xl shadow-lg p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
            {/* Payment Box */}
            <div className="w-full lg:w-1/2">
              <div className="w-full flex flex-col gap-4">
                {/* Plan Selection */}
                <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-5 mb-8">
                  <h3 className="text-sm font-medium text-gray-700">Your Current Plan</h3>
                  <DropBox
                    width="200px"
                    list={planArray}
                    setDropVal={setPlanDrop}
                    defaultVal={currentPriceData?.title || "Choose Price Plan"}
                  />
                </div>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                  ECA Assisted - Standard
                </h2>

                <p className="text-lg text-gray-600">
                  Basic Price: {currentPriceData?.basicPrice} <span></span>
                </p>

                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  ₹ {currentPriceData?.price} <span className="text-lg font-normal">/month</span>
                </p>

                {/* Features Section */}
                <div className="w-full">
                  {featureView ? (
                    <>
                      {currentPriceData?.fetures?.map((ft: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 mb-3">
                          <Image src={GreenTik} alt="Check" width={20} height={20} />
                          <p className="text-gray-700">{ft}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {currentPriceData?.fetures?.slice(0, 2)?.map((ft: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 mb-3">
                          <Image src={GreenTik} alt="Check" width={20} height={20} />
                          <p className="text-gray-700">{ft}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <p
                  className="text-base font-medium text-green-600 cursor-pointer hover:text-green-700 transition-colors duration-300"
                  onClick={() => setFeatureView(!featureView)}
                >
                  {featureView ? "Show less" : "Show More"}
                </p>

                {/* Final Price Box */}
                <div className="w-full p-5 bg-green-100 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-medium text-gray-900">Today's Total</p>
                    <span className="text-2xl font-bold text-gray-900">₹ {currentPriceData?.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Annual plans function the same as monthly plans with a 25% discount applied.
                  </p>
                  
                  {user?.data[0]?.purchase?.some(
                    (item: any) => item.productId === serviceId
                  ) ? (
                    <AppBtn
                      btnText="Go To Your Dashboard"
                      width="255px"
                      onClick={() => {
                        router.push("/user-profile");
                        goTop();
                      }}
                    />
                  ) : (
                    <AppBtn
                      btnText="Go For Final Payment"
                      width="232px"
                      onClick={handleBuy}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="w-full lg:w-1/2">
              <ContactSection subjectList={categoryDB?.data} section="Payment" />
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="w-full max-w-6xl mx-auto mt-16 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Our Services
          </h2>
          <div className="w-full mb-8">
            <MyCarousel data={categoryDB?.data} cardName="ServicesCard" />
          </div>
          <div className="flex justify-center">
            <AppBtn
              btnText="More Services"
              width="200px"
              height="50px"
              icon={rightArrow}
              onClick={() => {
                router.push("/services");
                goTop();
              }}
            />
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="w-full mt-16">
          <Subscribe />
        </div>
      </div>

      <Footer />
    </div>
  );
}
