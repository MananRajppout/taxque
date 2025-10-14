"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";


const smPageBG = "/assests/images/smPageBG.svg";
const AvatarIcon = "/assests/images/avatarIcon.png";
const MailIcon = "/assests/images/mailIcon.svg";
const supportIcon = "/assests/images/supportIcon.svg";
const MenuArrow = "/assests/images/MenuArrow.png";
const MenuArrow_A = "/assests/images/MenuArrow_A.png";
const featureIcon = "/assests/images/fetureIcon.svg";
const docUploadIcon = "/assests/images/docUploadIcon.svg";
const docSuccessIcon = "/assests/images/docSuccessIcon.svg";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AppBtn } from "@/components/Button";


import { useAuth } from "@/Util/context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/slices/store";
import { FetchCategory } from "@/store/slices/categorySlice";
import { FetchService } from "@/store/slices/serviceSlice";
import { GetUser, UpdateDocUrl } from "@/store/slices/userSlice";

export default function UserPage() {
  const router = useRouter();
  const [currentNav, setCurrentNav] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser, isAuthenticated, logout } = useAuth();
  
  const { data } = useSelector((state: RootState) => state.service);
  const user = useSelector((state: RootState) => state.user);
  const Category = useSelector((state: RootState) => state.category);

 
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!authUser) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  const [selectProductId, setSelectProductId] = useState<string>("");
  const [selectProduct, setSelectProduct] = useState<any[]>([]);
  const [activePage, setActivePage] = useState<string>("Order");
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [docSectionIndex, setDocSectionIndex] = useState<number[]>([]);
  const [requireDoc, setRequireDoc] = useState([
    {
      docCategory: "",
      docUrlArray: [
        {
          docTitle: "",
          docUrl: "",
          status: "pending",
          rejectMessage: "",
        },
      ],
    },
  ]);
  const [referPop, setReferPop] = useState<boolean>(false);
  const [referService, setReferService] = useState<string>("");
  const [referLink, setReferLink] = useState<string>("");

  const subMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const userData = authUser ? {
    data: [{
      _id: authUser.id,
      name: authUser.name,
      email: authUser.email,
      purchase: user?.data?.[0]?.purchase || []
    }]
  } : user;

  const serviceData = data || [];

  useEffect(() => {
    if (referService) {
      setReferLink(`http://localhost:3000/services/${referService}`);
    }
  }, [referService]);

  const copyReferService = () => {
    navigator.clipboard
      .writeText(referLink)
      .then(() => {
        toast.success("Link Copied!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  useEffect(() => {
    const tableData = selectProduct[0]?.documentsRequired?.tableData;
    if (!tableData) return;

    const structuredDocs: any = [];

    tableData.headers.forEach((header: string) => {
      const docUrlArray: any[] = [];

      tableData.rows.forEach((row: any) => {
        const docTitle = row[header];
        if (docTitle && docTitle.trim().length > 0) {
          docUrlArray.push({
            docTitle: docTitle,
            docUrl: "",
            status: "Pending",
            rejectMessage: "",
          });
        }
      });

      if (docUrlArray.length > 0) {
        structuredDocs.push({
          docCategory: header,
          docUrlArray: docUrlArray,
        });
      }
    });

    setRequireDoc(structuredDocs);
  }, [selectProduct]);

  // Handle document section toggle
  const handleActiveDocSection = (section: number) => {
    if (docSectionIndex.includes(section)) {
      const arr = docSectionIndex.filter((ind) => ind !== section);
      setDocSectionIndex(arr);
    } else {
      setDocSectionIndex((prev) => [...prev, section]);
    }
  };

 
  const handleMenuClick = (title: string) => {
    const newActive = activeMenu === title ? "" : title;
    setActiveMenu(newActive);
  };

  const handleActivePage = (page: string) => {
    setActivePage(page);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    catIndex: number,
    docIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
    
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', authUser?.id || '');
      formData.append('categoryIndex', catIndex.toString());
      formData.append('docIndex', docIndex.toString());


      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        setRequireDoc((prev) =>
          prev.map((doc, i) =>
            i === catIndex
              ? {
                  ...doc,
                  docUrlArray: doc.docUrlArray.map((d, j) =>
                    j === docIndex ? { ...d, docUrl: result.url, status: "Success" } : d
                  ),
                }
              : doc
          )
        );
        
        toast.success("File uploaded successfully!");
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed!");
    }
  };

  const sideMenuList = [
    {
      title: "My order",
      subTitle: [
        { title: "Order" },
        { title: "Plan upgrade" },
        { title: "Payment method" },
        { title: "cancel order" },
      ],
    },
    {
      title: "Category",
      subTitle: [
        { title: "All Category" },
      ],
    },
    {
      title: "refer",
      subTitle: [
        { title: "Refer And Earn" },
      ],
    },
    {
      title: "Support",
      subTitle: [
        { title: "Get Customer Support" },
      ],
    },
  ];

 
  let productList: any[] = [];
  if (serviceData.length && userData.data[0]?.purchase?.length) {
    const idList = userData.data[0]?.purchase.map((item: any) => item?.productId);
    productList = serviceData?.filter(
      (product) => product._id && idList.includes(product._id)
    );
  }

  useEffect(() => {
    if (!productList[0]?._id || selectProductId.length) return;
    setSelectProductId(productList[0]?._id);
  }, [productList]);

  useEffect(() => {
    const res = serviceData?.filter((val) => val?._id === selectProductId);
    setSelectProduct(res);
  }, [selectProductId, serviceData]);


  useEffect(() => {
    dispatch(FetchService());
    dispatch(FetchCategory());
    if (authUser?.id) {
      dispatch(GetUser({ _id: authUser.id }));
    }
  }, [dispatch, authUser?.id]);

  return (
    <div className="w-full min-h-screen bg-white text-black">
     
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement)?.id === "grayBox") {
            setReferPop(false);
          }
        }}
        id="grayBox"
        style={{ width: referPop ? "100%" : "0%" }}
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 transition-all duration-300 ${
          referPop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {referPop && (
          <div className="w-full max-w-md bg-green-500 rounded-2xl p-6 mx-4">
            <h1 className="text-2xl font-bold text-white text-center mb-8">
              Refer and Earn PopUp Header
            </h1>
            <div className="w-full flex items-center justify-between gap-3 mb-6">
              <input
                value={referLink}
                type="text"
                placeholder="https://taxque-service"
                className="flex-1 h-10 px-4 rounded-2xl border-none focus:outline-none"
              />
              <AppBtn
                disabled={!referLink}
                height="40px"
                btnText="Copy"
                onClick={copyReferService}
              />
            </div>
            <div className="w-full">
              <p className="text-lg text-white mb-3">Select a Service to Refer</p>
              <select
                className="w-full h-10 px-4 rounded-lg border-none focus:outline-none"
                onChange={(e) => setReferService(e.target.value)}
              >
                <option value="">Select</option>
                {serviceData?.map((el, i) => (
                  <option key={i} value={(el as any).Slug || el._id}>
                    {(el as any).displayName || el.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] flex flex-col relative bg-transparent text-black">
        <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
 
        <Image src={smPageBG} className="absolute top-0 left-0 w-full h-full -z-10 object-cover" alt="Page Background" fill priority />
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
       
          <div className="w-full lg:w-80 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="space-y-3">
              {sideMenuList?.map((sm, i) => (
                <div key={i} className="w-full">
                  <div
                    className={`w-full min-h-14 px-5 flex items-center justify-between rounded-lg cursor-pointer transition-all duration-300 ${
                      activeMenu === sm.title
                        ? "bg-green-500 text-white shadow-lg"
                        : "hover:bg-green-100"
                    }`}
                    onClick={() => handleMenuClick(sm.title)}
                  >
                    <p className="text-lg font-semibold">{sm.title}</p>
                    <Image
                      src={activeMenu === sm.title ? MenuArrow_A : MenuArrow}
                      alt="Arrow"
                      width={20}
                      height={20}
                      className={`transition-transform duration-300 ${
                        activeMenu === sm.title ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  <div
                    ref={(el) => {
                      subMenuRefs.current[i] = el;
                    }}
                    className={`overflow-hidden transition-all duration-300 ${
                      activeMenu === sm.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-green-50 rounded-lg mt-2 p-2">
                      {sm?.subTitle?.map((sb, j: number) => (
                        <div
                          key={j}
                          className={`w-full px-3 py-2 rounded cursor-pointer transition-colors duration-300 ${
                            activePage === sb.title
                              ? "bg-green-500 text-white"
                              : "hover:bg-green-200"
                          }`}
                          onClick={() => handleActivePage(sb.title)}
                        >
                          <p className="text-sm font-medium">{sb?.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
          
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden">
                    <Image src={AvatarIcon} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userData.data[0]?.name}</h2>
                    <p className="flex items-center gap-2 text-gray-600 mt-2">
                      <Image src={MailIcon} alt="Mail" width={16} height={16} />
                      {userData.data[0]?.email}
                    </p>
                  </div>  
                </div>
              </div>

              <div className="w-full lg:w-80 bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 h-12 border border-gray-200 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors duration-300">
                    <Image src={supportIcon} alt="Support" width={20} height={20} />
                    <p className="text-gray-700 font-medium">Support</p>
                  </div>
                  <div 
                    onClick={() => setReferPop(true)} 
                    className="flex items-center justify-center gap-3 h-12 border border-gray-200 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors duration-300"
                  >
                    <p className="text-gray-700 font-medium">Refer Now</p>
                  </div>
                </div>
              </div>
            </div>

            {activePage === "Order" && (
              <div className="space-y-6">
               
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Service List</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productList?.map((val, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectProductId(val?._id || "")}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectProductId === val?._id
                            ? "bg-green-200 border-2 border-green-500"
                            : "bg-green-50 border border-green-200 hover:bg-green-100"
                        }`}
                      >
                        <h4 className="text-lg font-semibold text-gray-900">{val?.title}</h4>
                        <p className="text-gray-600 mt-2">
                          <span className="font-medium">Category:</span> {val?.category?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Features</h2>
                  <div className="space-y-4">
                    {selectProduct[0]?.feturePoints?.map(
                      (fp: { title: string; summary: string }, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <Image src={featureIcon} alt="Feature" width={20} height={20} className="mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{fp?.title}</h4>
                            <p className="text-gray-600">{fp?.summary}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

              
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Required</h2>
                  <div className="space-y-4">
                    {requireDoc.map((doc, i) => (
                      <div
                        key={i}
                        className={`border border-gray-200 rounded-xl transition-all duration-300 ${
                          docSectionIndex.includes(i)
                            ? "p-6"
                            : "p-4"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900">
                            {i + 1}. {doc.docCategory}
                          </p>
                          <button
                            onClick={() => handleActiveDocSection(i)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                          >
                            <Image
                              src={MenuArrow}
                              alt="Arrow"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${
                                docSectionIndex.includes(i) ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </button>
                        </div>

                        {docSectionIndex.includes(i) && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {doc.docUrlArray.map((docItem, j) => (
                              <div key={j} className="border border-gray-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-3">{docItem.docTitle}</p>
                                
                                <label htmlFor={`doc${i}-${j}`} className="block cursor-pointer">
                                  {docItem.docUrl ? (
                                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <span className="text-gray-500">Document Preview</span>
                                    </div>
                                  ) : (
                                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-green-500 transition-colors duration-300">
                                      <Image src={docUploadIcon} alt="Upload" width={40} height={40} />
                                      <span className="text-sm text-gray-500 mt-2">Click to upload</span>
                                    </div>
                                  )}
                                </label>

                                <input
                                  id={`doc${i}-${j}`}
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, i, j)}
                                />

                                <div className={`flex items-center gap-2 mt-3 ${
                                  docItem.status === "Success" ? "text-green-600" : "text-yellow-600"
                                }`}>
                                  {docItem.status === "Success" && (
                                    <Image src={docSuccessIcon} alt="Success" width={16} height={16} />
                                  )}
                                  <span className="text-sm font-medium">{docItem.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <AppBtn 
                      btnText="Submit Documents" 
                      width="200px" 
                      height="50px"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/submit-documents', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              userId: authUser?.id,
                              documents: requireDoc,
                              productId: selectProductId
                            }),
                          });

                          if (response.ok) {
                            toast.success("Documents submitted successfully!");
                          } else {
                            throw new Error('Submission failed');
                          }
                        } catch (err) {
                          console.error("Submission failed:", err);
                          toast.error("Failed to submit documents!");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activePage === "Refer And Earn" && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">List of Refer Service</h1>
                <div className="text-center py-12">
                  <p className="text-gray-500">No referral services available yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
