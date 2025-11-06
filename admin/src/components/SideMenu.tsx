'use client';

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';


const Images = {
  MenuArrow: "/assets/Images/MenuArrow.png",
  MenuArrow_A: "/assets/Images/MenuArrow_A.png",
  Clogo: "/assets/Images/logo.svg",
};

type SidebarProps = {
  setActivePage: any;
};

export default function SideMenu({ setActivePage }: SidebarProps) {
  const [ActivePage, setActivePageState] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const subMenuRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedActivePage = localStorage.getItem("ActivePage");
      if (savedActivePage) {
        setActivePageState(savedActivePage);
      } else {
        localStorage.setItem("ActivePage", "Category");
        setActivePageState("Category");
        setActivePage("Category");
      }
    }
  }, [setActivePage]);

  const handleMenuClick = (title: string) => {
    const newActive = activeMenu === title ? "" : title;
    setActiveMenu(newActive);
    if (typeof window !== 'undefined') {
      localStorage.setItem("activeMenu", newActive);
    }
  };

  const HandleActivePage = (page: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("ActivePage", page);
    }
    setActivePageState(page);
    setActivePage(page);
  
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  interface sideMenuType {
    title: string;
    subTitle?: {
      title: string;
    }[];
  }
  
  const sideMenuList: sideMenuType[] = [
    {
      title: "Analytics",
      subTitle: [{ title: "View Analytics" }],
    },
    {
      title: "Ecommerce",
      subTitle: [
        { title: "Report" },
        { title: "Order" },
        { title: "Incomplete Order" },
        { title: "Order Cancellation" },
        { title: "Invoice" },
        { title: "coupon code" },
        { title: "Reviews" },
        { title: "Customers" },
      ],
    },
    // {
    //   title: "CNS",
    //   subTitle: [{ title: "Blog" }],
    // },
    {
      title: "Blog",
      subTitle: [{ title: "Posts" }, { title: "Categories" }, { title: "Tags" }],
    },
    {
      title: "Chats",
      subTitle: [{ title: "Chats" }, { title: "Configuration" }],
    },
    {
      title: "Payment",
      subTitle: [{ title: "Payment List" }],
    },
    {
      title: "User",
      subTitle: [{ title: "User list" }],
    },
    {
      title: "Product",
      subTitle: [
        { title: "Category" },
        { title: "Services" },
        { title: "Published Services" },
        { title: "Draft Services" },
      ],
    },
    {
      title: "Price",
      subTitle: [{ title: "Service List" }],
    },
    {
      title: "FAQ",
      subTitle: [{ title: "Service List (FAQ)" }],
    },
    {
      title: "Careers",
      subTitle: [
        { title: "Create Job" },
        { title: "Update and stop Job" },
        { title: "Applied Job" },
      ],
    },
    {
      title: "Contact",
      subTitle: [
        { title: "Contact us" },
        { title: "Blog page" },
        { title: "Service lead" },
        { title: "Our Team" },
      ],
    },
    {
      title: "Newsletters",
      subTitle: [{ title: "List" }],
    },
    {
      title: "Refer & Earn",
      subTitle: [
        { title: "Page" },
        { title: "Active User" },
      ],
    },
  ];

  useEffect(() => {
    const index = sideMenuList.findIndex((item: any) => item.title === activeMenu);

    subMenuRefs.current.forEach((submenu: any) => {
      if (submenu) {
        submenu.style.transition = "height 0.3s ease";
        submenu.style.height = "0px";
        submenu.style.padding = "0px";
      }
    });

    if (index !== -1 && activeMenu) {
      const el = subMenuRefs.current[index] as HTMLDivElement;

      if (el) {
        el.style.height = "auto";
        const fullHeight = el.scrollHeight;
        el.style.height = "0px";

        requestAnimationFrame(() => {
          el.style.transition = "height 0.3s ease";
          el.style.height = fullHeight + 20 + "px";
          el.style.padding = "10px";
        });
      }
    }
  }, [activeMenu]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMenu = localStorage.getItem("activeMenu");
      if (savedMenu) {
        setActiveMenu(savedMenu);
      }
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
      
     
      <button 
        className={`hidden fixed top-5 left-5 z-[1001] bg-[#5ab15b] border-none rounded-md p-2.5 cursor-pointer md:block lg:hidden ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-[-45deg] translate-x-[-5px] translate-y-[6px]' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-[45deg] translate-x-[-5px] translate-y-[-6px]' : ''}`}></span>
      </button>

      <div 
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-[999] ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

 
      <div className={`w-[250px] h-screen shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] bg-white transition-all duration-700 ease-[cubic-bezier(0.13,1.01,0.97,0.79)] pt-5 fixed left-0 top-0 z-[1000] lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="w-full flex justify-center">
          <Image src={Images.Clogo} alt="Clogo" width={160} height={60} />
        </div>

        <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-2.5 px-5 mt-10 relative overflow-y-auto pb-[90px] scrollbar-hide">
          {sideMenuList?.map((sm: any, i: number) => (
            <div key={i} className="w-full flex flex-col gap-2.5 justify-between">
              <div
                className={`w-full min-h-[35px] pl-5 flex items-center transition-all duration-300 rounded-lg cursor-pointer relative ${
                  activeMenu === sm.title
                    ? "bg-[#5ab15b] shadow-[0px_10px_30px_0px_#5ab15b66]"
                    : "hover:bg-[#5ab15b]"
                }`}
                onClick={() => handleMenuClick(sm.title)}
              >
                <p className={`text-sm font-semibold transition-all duration-300  ${
                  activeMenu === sm.title ? "text-white" : "text-[#44465a] hover:text-white"
                }`}>
                  {sm.title}
                </p>
                <Image
                  style={{
                    rotate: activeMenu === sm.title ? "180deg" : "0deg",
                  }}
                  src={
                    activeMenu === sm.title
                      ? Images.MenuArrow_A
                      : Images.MenuArrow
                  }
                  alt=""
                  className="w-3 h-3 absolute right-5 transition-all duration-700"
                  width={10}
                  height={10}
                />
              </div>

              <div
                style={{ height: "0px" }}
                ref={(el: any) => {
                  subMenuRefs.current[i] = el;
                }}
                className="w-full flex flex-col gap-2.5 bg-[#00b30029] rounded-lg transition-all duration-600 origin-top overflow-hidden"
              >
                {sm?.subTitle?.map((sb: any, j: number) => (
                  <div
                    className={`cursor-pointer transition-all duration-500 w-full p-2.5 rounded flex justify-start items-center ${
                      ActivePage === sb.title
                        ? "bg-[#5ab15b]"
                        : "hover:bg-[#5ab15b]"
                    }`}
                    key={j}
                    onClick={() => HandleActivePage(sb.title)}
                  >
                    <p className={`transition-all duration-200 text-xs ${
                      ActivePage === sb.title ? "text-white" : "text-[#44465a] hover:text-white"
                    }`}>
                      {sb?.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
