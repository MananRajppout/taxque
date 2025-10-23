"use client";

import { useEffect, useState } from "react";

const Images = {
  dowenloadIcon: "/assets/Images/downloadIcon.png",
  crossIcon: "/assets/Images/crossIcon.svg",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  NODataImg: "/assets/Images/NOData.jpg",
};


import { Loader, DropBox } from "@/components/Tools";


import { ServiceDataType } from "@/store/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { FetchUser } from "@/store/userSlice";
import { FetchService } from "@/store/serviceSlice";
import type { requireDocType } from "@/store/userSlice";

export default function Order() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.user);
  const Product = useSelector((state: RootState) => state.service);


 
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>();
  const selectedUser = data[selectedUserIndex || 0];
  const [popImgUrl, setPopImgUrl] = useState<string>("");
  const [currentProductList, setCurrentProductList] = useState<
    ServiceDataType[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [requireDoc, setRequireDoc] = useState<requireDocType[]>([
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
  const [docStatus, setDocStatus] = useState<string>("");
  console.log(docStatus);

  
  const docStatusList = ["Pending", "Accept", "Rejected"];



  const handleActiveService = (id: string | undefined) => {
    setSelectedProductId(id || "");
    const currentDocVal = selectedUser.purchase?.find(
      (val) => val?.productId === selectedProductId
    );
    if (currentDocVal?.requireDoc) {
      setRequireDoc(currentDocVal?.requireDoc);
    }
  };


  useEffect(() => {
    if (!selectedUser?.purchase || !Product?.data) return;

    const matchedProducts: ServiceDataType[] = selectedUser.purchase
      .map((el) => Product.data.find((val) => val?._id === el?.productId))
      .filter((p): p is ServiceDataType => Boolean(p)); // removes undefined

    setCurrentProductList(matchedProducts);
  }, [selectedUser, Product]);

  const downloadFile = async () => {
    try {
      const response = await fetch(popImgUrl, {
        mode: "cors",
      });

      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      const filename = popImgUrl.split("/").pop() || "download";
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Could not download file.");
    }
  };

  useEffect(() => {
    dispatch(FetchUser());
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchUser());
    }
    if (Product?.data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <>
      <div
        className={`p-6 bg-white rounded-lg shadow-sm ${
          ActivePage === "Order" ? "border-l-4 border-blue-500" : ""
        }`}
      >
      
        <Loader loding={status === "loading" ? true : false} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <p className="text-xl sm:text-3xl font-semibold text-gray-800">Order List</p>
        </div>

        <div
          style={{ display: popImgUrl ? "flex" : "none" }}
          className="absolute w-full h-full flex justify-center items-start z-50"
        >
          <div className="absolute top-0 right-1/5 flex flex-row items-center gap-5">
            <img onClick={downloadFile} src={Images.dowenloadIcon} alt="" className="w-10 h-10 cursor-pointer" />
            <img
              src={Images.crossIcon}
              alt=""
              onClick={() => setPopImgUrl("")}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          {popImgUrl ? (
            <img className="w-3/5" src={popImgUrl} alt="" />
          ) : null}
        </div>

        {status === "error" ? (
          <div className="w-full h-full flex justify-center items-start">
            <img src={Images.InternalServerErrImg} alt="" className="w-4/5 h-4/5 rounded-2xl" />
          </div>
        ) : status === "idle" ? (
          <div className="w-full h-full flex flex-col">
            {data.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <img src={Images.NODataImg} alt="" />
              </div>
            ) : (
              <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-1/3 flex flex-col">
                  {data?.map((el, i) => (
                    <div
                      key={i}
                      className={
                        selectedUserIndex === i
                          ? "w-full p-5 relative bg-[#5ab15b5e] mb-5 rounded-[20px] pr-24 bg-[#18581a94] cursor-pointer text-white"
                          : "w-full p-5 relative bg-[#5ab15b5e] mb-5 rounded-[20px] pr-24 cursor-pointer hover:bg-[#18581a94] transition-all duration-300"
                      }
                      onClick={() => setSelectedUserIndex(i)}
                    >
                      <h3 className={`text-lg font-semibold ${selectedUserIndex === i ? 'text-white' : 'text-gray-800'}`}>{el.name}</h3>
                      <p className={`text-xs ${selectedUserIndex === i ? 'text-gray-200' : 'text-gray-700'}`}>{el.email}</p>
                    </div>
                  ))}
                </div>
                <div className="w-full lg:w-2/3 p-5 flex flex-col gap-6">
                  <div className="w-full">
                    <h4 className="text-xl font-semibold mb-5">Purchased Product List</h4>
                    <div className="w-full flex flex-row flex-wrap gap-5">
                      {currentProductList?.map(
                        (prd: ServiceDataType, i: number) => (
                          <div
                            onClick={() => {
                              handleActiveService(prd?._id);
                            }}
                            className={
                              selectedProductId === prd?._id
                                ? "bg-[#18581a94] h-12 px-4 rounded-[15px] border border-[#048b0696] flex justify-center items-center cursor-pointer transition-all duration-300"
                                : "bg-[#5ab15b5e] h-12 px-4 rounded-[15px] border border-[#048b0696] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#18581a94]"
                            }
                            key={i}
                          >
                            <p className={selectedProductId === prd?._id ? "text-white" : "text-black"}>{prd?.displayName}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <h4 className="text-xl font-semibold mb-5">Submited Documents</h4>
                    {requireDoc?.map((val: requireDocType, i: number) => (
                      <div key={i} className="shadow-lg p-5 rounded-[20px] bg-white mb-5">
                        <h4 className="text-lg font-semibold mb-5">{val.docCategory}</h4>
                        <div className="p-5 mt-5 bg-[#fa8a0514] rounded-[15px] flex flex-row flex-wrap gap-2">
                          {val?.docUrlArray?.map((el, j) => (
                            <div key={j} className="min-w-80 rounded-[15px] p-4 bg-[#5ab15b5e] border border-[#048b0696]">
                              <p className="text-sm">{el?.docTitle}</p>
                              {el?.docUrl.length ? (
                                <a
                                  className="text-blue-600 hover:text-blue-800"
                                  href={el?.docUrl}
                                  target="_blank"
                                >
                                  <div className="w-fit flex flex-row items-center gap-2 p-1 bg-white rounded border border-gray-300 my-4 pl-5">
                                    <p className="text-black no-underline text-sm">Download </p>
                                    <img src={Images.dowenloadIcon} alt="" className="w-5" />
                                  </div>
                                </a>
                              ) : (
                                <p className="text-red-600 text-xs my-4">
                                  Document Not Available !
                                </p>
                              )}
                              <div className="flex flex-row items-center gap-1">
                                <DropBox
                                  setDropVal={setDocStatus}
                                  list={docStatusList}
                                  defaultVal="Status"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
