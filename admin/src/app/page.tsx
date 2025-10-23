"use client";

import { useEffect, useState } from "react";

import SideMenu from "@/components/SideMenu";
import CategorySection from "@/components/CategorySection";
import ServiceSection from "@/components/ServiceSection";
import FAQSection from "@/components/FAQSection";
import PriceSection from "@/components/PriceSection";
import UserSection from "@/components/Order";
import BlogSection from "@/components/BlogSection";
import TeamSection from "@/components/TeamSection";
import CreateJobSection from "@/components/JobCreate";
import ApplicationSection from "@/components/Application";
import Users from "@/components/Users";
import ContactUs from "@/components/ContactUser/ContactUs";
import BlogLead from "@/components/ContactUser/Blog";
import ServiceLead from "@/components/ContactUser/Service";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import { AppBtn } from "@/components/AppButton";
import { Reloader } from "@/components/Tools";


const Images = {
  user: "/assets/Images/userIcon.svg",
  eyeIcon: "/assets/Images/eye.png",
  eyeCloseIcon: "/assets/Images/eyeClose.png",
};

export interface activePageProps {
  activePage: string;
}

export default function Home() {
  const logInDate = typeof window !== 'undefined' ? localStorage.getItem("localTime") || 0 : 0;
  const [activePage, setActivePage] = useState<string>("Product");
  console.log(activePage);
  const [authPop, setAuthPop] = useState<boolean>(true);
  const [logInputVal, setLogInputVal] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [pwdView, setPwdView] = useState<boolean>(false);
  const DBUserAuth = {
    email: "sadafhina197@gmail.com",
    password: "hinamirza",
  };
  const [differenceInDays, setDifferenceInDays] = useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLogInputVal((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const handleAuthClick = () => {
    if (
      logInputVal.email !== DBUserAuth.email ||
      logInputVal.password !== DBUserAuth.password
    ) {
      toast.warn("Access Denied !");
      return;
    } else {
      toast.success("LogIn successfully !");
      const date = new Date().toLocaleDateString();
      if (typeof window !== 'undefined') {
        localStorage.setItem("localTime", date);
      }
      Reloader(100);
    }
  };

  useEffect(() => {
    if (differenceInDays > 1) {
      setAuthPop(false);
    }
  }, [logInDate, differenceInDays]);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const preNewDate = new Date(currentDate);
    const preOldDate = new Date(logInDate);
    const differenceInTime = preNewDate.getTime() - preOldDate.getTime();
    setDifferenceInDays(differenceInTime / (1000 * 60 * 60 * 24));
  }, [logInDate]);

  return (
    <>
      <ToastContainer />
      {!authPop ? (
        <div
          style={{ 
            display: authPop ? "none" : "flex",
            background: 'linear-gradient(135deg, #2563eb, #0d9488)'
          }}
          className="fixed inset-0 w-full h-full z-50 flex justify-center items-start pt-8 sm:pt-20 px-4"
        >
      
          <div className="w-full max-w-sm sm:max-w-lg mx-4 p-4 sm:p-6 rounded-lg bg-white/13 backdrop-blur-md border border-white/30 shadow-xl flex flex-col items-center gap-6 sm:gap-8">
            <h1 className="text-center text-white text-xl sm:text-2xl font-bold">Admin Login</h1>
            
            <div className="w-full h-10 sm:h-12 bg-white rounded-lg relative">
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                onChange={handleChange}
                className="border-none w-full h-full pl-3 sm:pl-4 pr-8 sm:pr-10 bg-transparent rounded-lg focus:outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base"
              />
              <img className="w-4 sm:w-5 absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3 opacity-60" src={Images.user} alt="" />
            </div>
            
            
            <div className="w-full h-10 sm:h-12 bg-white rounded-lg relative">
              <input
                name="password"
                type={pwdView ? "text" : "password"}
                placeholder="Enter Password"
                onChange={handleChange}
                className="border-none w-full h-full pl-3 sm:pl-4 pr-8 sm:pr-10 bg-transparent rounded-lg focus:outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base"
              />
              <img
                onClick={() => setPwdView(!pwdView)}
                className="w-4 sm:w-5 absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3 opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                src={pwdView ? Images.eyeIcon : Images.eyeCloseIcon}
                alt=""
              />
            </div>
            
           
            <div className="w-full">
              <AppBtn
                width="100%"
                btnText="Login"
                borderRadius="8px"
                bgColor="#244889"
                onClick={handleAuthClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-white relative">
          <SideMenu setActivePage={setActivePage} />
          <div className="w-full ml-0 lg:ml-[300px] min-h-screen bg-gray-50 transition-all duration-300">
            <div className="w-full h-full p-6">
             
              {activePage === "View Analytics" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
                  <p className="text-gray-600">Analytics data will be displayed here.</p>
                </div>
              )}

              {activePage === "Report" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Ecommerce Reports</h2>
                  <p className="text-gray-600">Ecommerce reports will be displayed here.</p>
                </div>
              )}
              {activePage === "Order" && <UserSection />}
              {activePage === "Incomplete Order" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Incomplete Orders</h2>
                  <p className="text-gray-600">Incomplete orders will be displayed here.</p>
                </div>
              )}
              {activePage === "Order Cancellation" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Order Cancellations</h2>
                  <p className="text-gray-600">Cancelled orders will be displayed here.</p>
                </div>
              )}
              {activePage === "Invoice" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Invoices</h2>
                  <p className="text-gray-600">Invoice management will be displayed here.</p>
                </div>
              )}
              {activePage === "coupon code" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Coupon Codes</h2>
                  <p className="text-gray-600">Coupon code management will be displayed here.</p>
                </div>
              )}
              {activePage === "Reviews" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                  <p className="text-gray-600">Customer reviews will be displayed here.</p>
                </div>
              )}
              {activePage === "Customers" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Customers</h2>
                  <p className="text-gray-600">Customer management will be displayed here.</p>
                </div>
              )}

              
              {activePage === "Blog" && <BlogSection />}

            
              {activePage === "Payment List" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Payment List</h2>
                  <p className="text-gray-600">Payment transactions will be displayed here.</p>
                </div>
              )}

              {activePage === "User list" && <Users />}

             
              {activePage === "Category" && <CategorySection />}
              {activePage === "Published Services" && <ServiceSection />}
              {activePage === "Draft Services" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Draft Services</h2>
                  <p className="text-gray-600">Draft services will be displayed here.</p>
                </div>
              )}

           
              {activePage === "Service List" && <PriceSection />}

              {activePage === "Service List (FAQ)" && <FAQSection />}

             
              {activePage === "Create Job" && <CreateJobSection />}
              {activePage === "Update and stop Job" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Update and Stop Job</h2>
                  <p className="text-gray-600">Job management will be displayed here.</p>
                </div>
              )}
              {activePage === "Applied Job" && <ApplicationSection />}

             
              {activePage === "Contact us" && <ContactUs />}
              {activePage === "Blog page" && <BlogLead />}
              {activePage === "Service lead" && <ServiceLead />}
              {activePage === "Our Team" && <TeamSection />}

              {activePage === "List" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Newsletter List</h2>
                  <p className="text-gray-600">Newsletter subscribers will be displayed here.</p>
                </div>
              )}

            
              {activePage === "Page" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Refer & Earn Page</h2>
                  <p className="text-gray-600">Refer & earn page management will be displayed here.</p>
                </div>
              )}
              {activePage === "Active User" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Active Users</h2>
                  <p className="text-gray-600">Active referral users will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
