'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';


const Images = {
  editIcon: "/assets/Images/editIcon.svg",
  deleteIcon: "/assets/Images/BinIcon.svg",
  AddIcon: "/assets/Images/WhiteAddIcon.png",
  crossIcon: "/assets/Images/crossIcon.svg",
  NODataImg: "/assets/Images/NOData.jpg",
  InternalServerErrImg: "/assets/Images/intenalServerErr.jpg",
  crossIconV2: "/assets/Images/crossIconV2.svg",
  faqIcon: "/assets/Images/faqIconV2.png",
};

import { AppBtn, AppHoloBtn, AppOrangeBtn } from "@/components/AppButton";
import { toast } from "react-toastify";
import { Loader, GoTop } from "@/components/Tools";
import RichTextEditor from "@/components/TextEditor"
import Quill from 'quill';

import {
  FetchService,
  AddFAQ,
  DeleteFAQ,
  UpdateFAQ,
  } from "@/store/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

import type {
  FAQUpdatTeype,
  ServiceDataType,
  FAQType,
} from "@/store/serviceSlice";

export default function FAQSection() {
  const ActivePage = typeof window !== 'undefined' ? localStorage.getItem("ActivePage") : null;
  const summaryUpdateRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.service);
  const [activeProduct, setActiveProduct] = useState(0);
  const [addFAQ, setAddFAQ] = useState(false);
  const [localFAQData, setLocalFAQData] = useState({
    question: "",
    answer: "",
  });
  const [faqId, setFaqId] = useState<string>();
  const [deletePop, setDeletePop] = useState(false);
  const [localUpdateFAQ, setLocalUpdateFAQ] = useState<FAQUpdatTeype>({
    question: "",
    answer: "",
  });
  const [updateIndex, setUpdateIndex] = useState<number>(1111111111111);

 
  const handleFAQChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setLocalFAQData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postFAQ = () => {
    if (!localFAQData.answer.length && !localFAQData.question.length) {
      toast.warn("All fields are required!");
      return;
    }
    if (!data[activeProduct]._id) {
      console.error("Service ID is undefined. Cannot update service.");
      return;
    }
    dispatch(
      AddFAQ({
        id: data[activeProduct]._id,
        data: localFAQData,
      })
    );
  };

  const closeCreateFAQ = () => {
    setAddFAQ(false);
    setLocalFAQData({
      question: "",
      answer: "",
    });
  };

  
  const DeletePopOpen = (id: string | undefined) => {
    GoTop();
    setFaqId(id);
    setDeletePop(true);
  };

  const DeleteFaq = () => {
    if (!data[activeProduct]._id) {
      console.error("Product ID is undefined.");
      return;
    }
    if (!faqId) {
      console.error("FAQ ID is undefined.");
      return;
    }
    dispatch(
      DeleteFAQ({
        productId: data[activeProduct]._id,
        faqId: faqId,
      })
    );
  };


  const handleUpdateFAQ = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e?.target;
    setLocalUpdateFAQ((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleActiveEdit = (index: number) => {
    setUpdateIndex(index);
    setLocalUpdateFAQ((prevData: any) => ({
      ...prevData,
      question: data[activeProduct]?.FAQ?.[index]?.question || "",
      answer: data[activeProduct]?.FAQ?.[index]?.answer || "",
    }));
  };

  const updateFAQ = (Id: string | undefined) => {
    dispatch(
      UpdateFAQ({
        data: {
          productId: data[activeProduct]._id,
          faqId: Id,
          question: localUpdateFAQ?.question,
          answer: localUpdateFAQ?.answer,
        },
      })
    );
  };

  useEffect(() => {
    const element = document.querySelector(".mainBoxActive") as HTMLElement;
    if (element) {
      element.style.overflowY = deletePop ? "hidden" : "scroll";
    }
  }, [deletePop]);

  const FAQData = data[activeProduct];
  
  useEffect(() => {
    dispatch(FetchService());
    if (data?.length < 0) {
      dispatch(FetchService());
    }
  }, []);

  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-sm ${
        ActivePage === "Service List (FAQ)" ? "border-l-4 border-blue-500" : ""
      }`}
    >
  
      <Loader loding={status === "loading" ? true : false} />

      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${deletePop ? "block" : "hidden"}`}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">You want to delete this Service ?</h3>
          <div className="flex gap-4">
            <AppHoloBtn btnText="Cancel" onClick={() => setDeletePop(false)} />
            <AppOrangeBtn btnText="Delete" onClick={DeleteFaq} />
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-5 rounded-[20px] flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
        <p className="text-xl sm:text-2xl font-bold text-gray-800 m-0">FAQ</p>
        <AppBtn
          btnText="Add FAQ"
          icon={Images.AddIcon}
          onClick={() => setAddFAQ(true)}
        />
      </div>

      {status === "error" ? (
        <div className="flex justify-center items-center h-64">
          <Image src={Images.InternalServerErrImg} alt="Server Error" width={200} height={200} />
        </div>
      ) : status === "idle" ? (
        <div className="w-full h-full flex flex-col lg:flex-row justify-between gap-5">
     
          <div className="w-full lg:w-[30%] h-full overflow-y-auto rounded-[20px] bg-white p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5">List of F&Q</h2>
            <div className="h-96 overflow-y-auto flex flex-col gap-5 mt-5">
              {data?.map((el: any, i: number) => (
                <div
                  key={i}
                  className={`w-full rounded-[10px] p-2.5 pl-5 cursor-pointer transition-all duration-500 ${
                    activeProduct === i
                      ? "bg-[#5ab15b94] shadow-lg shadow-[#5ab15b66]"
                      : "bg-[#5ab15b5e] hover:bg-[#5ab15b94]"
                  }`}
                  onClick={() => {
                    setActiveProduct(i);
                    setUpdateIndex(9999);
                  }}
                >
                  <p className="leading-5 text-sm sm:text-base">{el.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[70%] h-full overflow-y-auto p-5 rounded-[20px] bg-white">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5">{FAQData?.title}</h2>
            <div className="h-96 overflow-y-auto space-y-6">
             
              <div
                style={{ display: addFAQ ? "block" : "none" }}
                className="bg-[#5ab15b1a] border border-green-500 rounded-lg p-6"
              >
                <div className="absolute top-1 right-5 flex flex-row items-center gap-5">
                  <AppBtn btnText="Save" height="32px" onClick={postFAQ} />
                  <Image
                    src={Images.crossIcon}
                    className="w-5 h-5 cursor-pointer"
                    alt=""
                    onClick={closeCreateFAQ}
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>

                <div className="mb-4">
                  <p className="text-sm text-[#6a6a6a] mb-1">Question</p>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Faq question"
                    type="text"
                    name="question"
                    value={localFAQData?.question}
                    onChange={handleFAQChange}
                  />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-[#6a6a6a] mb-1">Answer</p>
                  <RichTextEditor 
                    state={localFAQData?.answer} 
                    setState={(val) => setLocalFAQData((prv) => ({ ...prv, answer: val }))} 
                  />
                </div>
              </div>

              {FAQData?.FAQ?.length === 0 ? (
                <div
                  style={{ display: addFAQ ? "none" : "flex" }}
                  className="flex justify-center items-center h-64"
                >
                  <Image src={Images.NODataImg} alt="No Data" width={200} height={200} />
                </div>
              ) : (
                <div className="space-y-6">
                  {FAQData?.FAQ?.map((el: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                      <div className={`absolute top-1 right-5 flex flex-row items-center gap-5 ${
                        i != updateIndex ? "opacity-50" : ""
                      }`}>
                        {i != updateIndex ? null : (
                          <AppBtn
                            btnText="Save"
                            height="32px"
                            onClick={() => updateFAQ(el?._id)}
                          />
                        )}
                        {i != updateIndex ? (
                          <Image
                            src={Images.editIcon}
                            className="w-5 h-5 cursor-pointer"
                            alt=""
                            onClick={() => handleActiveEdit(i)}
                            width={20}
                            height={20}
                          />
                        ) : (
                          <Image
                            style={{ width: "27px" }}
                            src={Images.crossIconV2}
                            className="cursor-pointer"
                            alt=""
                            onClick={() => setUpdateIndex(9999)}
                            width={27}
                            height={27}
                          />
                        )}

                        <Image
                          src={Images.deleteIcon}
                          className="w-5 h-5 cursor-pointer"
                          alt=""
                          onClick={() => DeletePopOpen(el?._id)}
                          width={20}
                          height={20}
                        />
                      </div>

                      {i != updateIndex ? (
                        <p className="flex items-center gap-2.5 text-lg sm:text-xl font-medium text-gray-800">
                          <Image className="w-10 h-10" src={Images.faqIcon} alt="" width={40} height={40} />
                          {el?.question}
                        </p>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-[#6a6a6a] mb-1">Question</p>
                            <input
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Faq question"
                              type="text"
                              name="question"
                              disabled={i != updateIndex}
                              value={
                                i === updateIndex
                                  ? localUpdateFAQ?.question
                                  : el?.question
                              }
                              onChange={handleUpdateFAQ}
                            />
                          </div>
                          
                          <div>
                            <p className="text-sm text-[#6a6a6a] mb-1">Answer</p>
                            <RichTextEditor 
                              ref={summaryUpdateRef} 
                              state={i === updateIndex
                                ? localUpdateFAQ?.answer
                                : el?.answer} 
                              setState={(val) => setLocalUpdateFAQ((prv: any) => ({ ...prv, answer: val }))} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
