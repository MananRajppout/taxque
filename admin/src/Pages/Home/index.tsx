import { useEffect, useState } from "react";
import "./style.css";

//components
import SideMenu from "../../Components/SideMenu";
import CategorySection from "../../Components/CategorySection";
import ServiceSection from "../../Components/ServiceSection";
import FAQSection from "../../Components/FAQSection";
import PriceSection from "../../Components/PriceSection";
import UserSection from "../../Components/Orders";
import BlogSection from "../../Components/BlogSection";
import TeamSection from "../../Components/TeamSection";
import CreateJobSection from "../../Components/JobCreate";
import ApplicationSection from "../../Components/Application";
import Users from "../../Components/Users";
import ContactUs from "../../Components/ContactUser/ContactUs";
import BlogLead from "../../Components/ContactUser/Blog";
import ServiceLead from "../../Components/ContactUser/Service";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import { AppBtn } from "../../Components/AppButton";
import { Images } from "../../assets/Images";
import { Reloader } from "../../Components/Tools";

export interface activePageProps {
  activePage: string;
}

export default function Home() {
  const logInDate = localStorage.getItem("localTime") || 0;
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
    email: "taxque@gmail.com",
    password: "taxque2025",
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
      localStorage.setItem("localTime", date);
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
          style={{ display: authPop ? "none" : "flex" }}
          className="grayBox logGrayBox"
        >
          <div className="logInputBox">
            <h1>Admin Login</h1>
            <div className="LoginputBox">
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <img className="inputIcon" src={Images.user} alt="" />
            </div>
            <div className="LoginputBox">
              <input
                name="password"
                type={pwdView ? "text" : "password"}
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <img
                onClick={() => setPwdView(!pwdView)}
                className="inputIcon"
                src={pwdView ? Images.eyeIcon : Images.eyeCloseIcon}
                alt=""
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="logBtnBox">
              <AppBtn
                width="100%"
                btnText="LogIn"
                borderRadius="6px"
                bgColor="#244889"
                onClick={handleAuthClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboardMainSection">
          <SideMenu setActivePage={setActivePage} />
          <div className="mainSection">
            {/* category */}
            <CategorySection />

            {/* Product */}
            <ServiceSection />

            {/* FAQ section */}
            <FAQSection />

            {/* Price section */}
            <PriceSection />

            {/* User */}
            <UserSection />

            {/* contact user */}
            <ContactUs />
            <BlogLead />
            <ServiceLead />

            {/* Blog */}
            <BlogSection />

            {/* Team section */}
            <TeamSection />

            {/* Create Job Section */}
            <CreateJobSection />

            <ApplicationSection />

            {/* Users */}
            <Users />
          </div>
        </div>
      )}
    </>
  );
}
