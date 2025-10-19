"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Images (use public paths)
const smPageBG = "/assests/images/smPageBG.svg";
const paymentBg = "/assests/images/paymentBg.svg";
const GreenTik = "/assests/images/GreenTik.svg";
const rightArrow = "/assests/images/rightArrow.svg";
const homeBg = "/assests/images/homeBg.svg";

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
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [showSuccess, setShowSuccess] = useState(false);

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
    setIsLoading(true);
    try {
      // Enhanced payment integration with better UX
      const mockOrder = {
        id: `order_${Date.now()}`,
        amount: parseInt(amount) * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      };

      // Simulate payment processing
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
        
        // Auto redirect after success animation
        setTimeout(() => {
          router.push("/user-profile");
        }, 2000);
      }, 2000);

    } catch (error) {
      setIsLoading(false);
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
      {/* Enhanced Hero Section */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex flex-col relative bg-gradient-to-br from-blue-50 to-green-50 text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image src={homeBg} className="w-full h-full object-cover opacity-20" alt="Page Background" fill priority />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Complete Your Payment
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Secure payment processing for your TaxQue services
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Instant Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Main Section */}
      <div className="w-full relative flex flex-col items-center bg-gray-50 py-16">
        {/* Payment Checkout Box */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="w-full bg-white rounded-3xl shadow-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 border border-gray-100">
            {/* Payment Box */}
            <div className="w-full lg:w-1/2">
              <div className="w-full flex flex-col gap-4">
                {/* Plan Selection */}
                <div className="w-full bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <h3 className="text-sm font-semibold text-gray-700">Select Your Plan</h3>
                    <DropBox
                      width="250px"
                      list={planArray}
                      setDropVal={setPlanDrop}
                      defaultVal={currentPriceData?.title || "Choose Price Plan"}
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {Product?.title || "ECA Assisted - Standard"}
                  </h2>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <span className="text-lg text-gray-500 line-through">
                      ₹{currentPriceData?.basicPrice}
                    </span>
                    <span className="text-3xl md:text-4xl font-bold text-green-600">
                      ₹{currentPriceData?.price}
                    </span>
                    <span className="text-lg font-medium text-gray-600">/month</span>
                  </div>
                  
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ₹{currentPriceData?.basicPrice ? (parseInt(currentPriceData.basicPrice.replace(/,/g, "")) - parseInt(currentPriceData.price.replace(/,/g, ""))) : 0}
                  </div>
                </div>

                {/* Features Section */}
                <div className="w-full bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                  <div className="space-y-3">
                    {featureView ? (
                      <>
                        {currentPriceData?.fetures?.map((ft: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Image src={GreenTik} alt="Check" width={14} height={14} />
                            </div>
                            <p className="text-gray-700 font-medium">{ft}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {currentPriceData?.fetures?.slice(0, 3)?.map((ft: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Image src={GreenTik} alt="Check" width={14} height={14} />
                            </div>
                            <p className="text-gray-700 font-medium">{ft}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  
                  <button
                    className="mt-4 text-base font-medium text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-300 flex items-center gap-2"
                    onClick={() => setFeatureView(!featureView)}
                  >
                    {featureView ? "Show less" : `+${currentPriceData?.fetures?.length - 3} more features`}
                    <span className="text-sm">{featureView ? "▲" : "▼"}</span>
                  </button>
                </div>

                {/* Payment Method Selection */}
                <div className="w-full bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700 font-medium">Credit/Debit Card & UPI</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700 font-medium">Net Banking</span>
                    </label>
                  </div>
                </div>

                {/* Final Price Box */}
                <div className="w-full p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-200">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xl font-semibold text-gray-900">Total Amount</p>
                    <span className="text-3xl font-bold text-green-600">₹{currentPriceData?.price}</span>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <span>Base Price</span>
                      <span>₹{currentPriceData?.basicPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-green-600 mb-2">
                      <span>Discount</span>
                      <span>-₹{currentPriceData?.basicPrice ? (parseInt(currentPriceData.basicPrice.replace(/,/g, "")) - parseInt(currentPriceData.price.replace(/,/g, ""))) : 0}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-semibold text-gray-900">
                      <span>Final Amount</span>
                      <span>₹{currentPriceData?.price}</span>
                    </div>
                  </div>
                  
                  {user?.data[0]?.purchase?.some(
                    (item: any) => item.productId === serviceId
                  ) ? (
                    <AppBtn
                      btnText="Go To Your Dashboard"
                      width="100%"
                      height="50px"
                      onClick={() => {
                        router.push("/user-profile");
                        goTop();
                      }}
                    />
                  ) : (
                    <AppBtn
                      btnText={isLoading ? "Processing..." : "Complete Payment"}
                      width="100%"
                      height="50px"
                      onClick={handleBuy}
                      disabled={isLoading}
                    />
                  )}
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    🔒 Your payment is secured with 256-bit SSL encryption
                  </p>
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

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image src={GreenTik} alt="Success" width={32} height={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your payment has been processed successfully. Redirecting to your dashboard...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
