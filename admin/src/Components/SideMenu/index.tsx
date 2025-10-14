import { useState, useRef, useEffect } from "react";
import "./style.css";

//images
import { Images } from "../../assets/Images";
import Clogo from "../../assets/Images/logo.svg";

type SidebarProps = {
  setActivePage: any;
};

export default function SideMenu({ setActivePage }: SidebarProps) {
  const ActivePage = localStorage.getItem("ActivePage");
  const [activeMenu, setActiveMenu] = useState<string>();
  const subMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!ActivePage) {
    localStorage.setItem("ActivePage", "Category");
    setActivePage("Category");
  }

  const handleMenuClick = (title: string) => {
    const newActive = activeMenu === title ? "" : title;
    setActiveMenu(newActive);
    localStorage.setItem("activeMenu", newActive);
  };

  const HandleActivePage = (page: string) => {
    localStorage.setItem("ActivePage", page);
    setActivePage(page);
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
        {
          title: "Report",
        },
        {
          title: "Order",
        },
        {
          title: "Incomplete Order",
        },
        {
          title: "Order Cancellation",
        },
        {
          title: "Invoice",
        },
        {
          title: "coupon code",
        },
        {
          title: "Reviews",
        },
        {
          title: "Customers",
        },
      ],
    },
    {
      title: "CNS",
      subTitle: [
        {
          title: "Blog",
        },
      ],
    },
    {
      title: "Payment",
      subTitle: [
        {
          title: "Payment List",
        },
      ],
    },
    {
      title: "User",
      subTitle: [
        {
          title: "User list",
        },
      ],
    },
    {
      title: "Product",
      subTitle: [
        {
          title: "Category",
        },
        {
          title: "Published Services",
        },
        {
          title: "Draft Services",
        },
      ],
    },
    {
      title: "Price",
      subTitle: [
        {
          title: "Service List",
        },
      ],
    },
    {
      title: "FAQ",
      subTitle: [
        {
          title: "Service List (FAQ)",
        },
      ],
    },
    {
      title: "Careers",
      subTitle: [
        {
          title: "Create Job",
        },
        {
          title: "Update and stop Job",
        },
        {
          title: "Applied Job",
        },
      ],
    },
    {
      title: "Contact",
      subTitle: [
        {
          title: "Contact us",
        },
        {
          title: "Blog page",
        },
        {
          title: "Service lead",
        },
        {
          title: "Our Team",
        },
      ],
    },

    {
      title: "Newsletters",
      subTitle: [
        {
          title: "List",
        },
      ],
    },

    {
      title: "Refer & Earn",
      subTitle: [
        {
          title: "Page",
        },
        {
          title: "Active User",
        },
      ],
    },
  ];

  useEffect(() => {
    const index = sideMenuList.findIndex((item) => item.title === activeMenu);

    subMenuRefs.current.forEach((submenu) => {
      if (submenu) {
        submenu.style.transition = "height 0.3s ease";
        submenu.style.height = "0px";
        submenu.style.padding = "0px";
      }
    });

    if (index !== -1 && activeMenu) {
      const el = subMenuRefs.current[index];

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
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  return (
    <>
      <div className={"sideMenu"}>
        <div className="clogBox">
          <img src={Clogo} alt="Clogo" />
        </div>

        <div className={"sideMenuItem_Box"}>
          {sideMenuList?.map((sm, i) => (
            <div key={i} className="sideMenuItemMainBox">
              <div
                className={
                  activeMenu === sm.title
                    ? "sideMenuItem ActiveSideMenuItem"
                    : "sideMenuItem"
                }
                onClick={() => handleMenuClick(sm.title)}
              >
                <p>{sm.title}</p>
                <img
                  style={{
                    rotate: activeMenu === sm.title ? "180deg" : "0deg",
                  }}
                  src={
                    activeMenu === sm.title
                      ? Images.MenuArrow_A
                      : Images.MenuArrow
                  }
                  alt=""
                />
              </div>

              <div
                style={{ height: "0px" }}
                ref={(el) => {
                  subMenuRefs.current[i] = el;
                }}
                className="subMenuItemBox"
              >
                {sm?.subTitle?.map((sb, j: number) => (
                  <div
                    className={
                      ActivePage === sb.title
                        ? "subMenuItemActive subMenuItem"
                        : "subMenuItem"
                    }
                    key={j}
                    onClick={() => HandleActivePage(sb.title)}
                  >
                    <p>{sb?.title}</p>
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
